import React, { useState, useEffect } from "react";
import { Person } from "../../../lib/types";
import { getFullName } from "../../../lib/person";
import Fuse from "fuse.js";
import "./index.scss";
import Input from "../../components/Input";
import PersonCard from "../../components/PersonCard";
import Body from "../../components/Body";
import Footer from "../../components/Footer";
import Wrapper from "../../components/Wrapper";
import Loader from "../../components/Loader";
import { LazyLoadPeople } from "../../../server/actions/lazyLoadPeople";
import { ModifyPerson } from "../../../server/actions/modifyPerson";

function People() {
  const [activeId, setActiveId] = useState<number | null>(null);
  const [query, setQuery] = useState("");

  const { loadPeople, called, loading, data } = LazyLoadPeople();
  const { modify, data: mutationData, mutationError } = ModifyPerson();

  // Effects
  useEffect(() => {
    if (!data) loadPeople();
  }, [data]);

  // Functions
  const SubmitModify = (
    id: number,
    first: string,
    last: string,
    title: string,
    email: string
  ) => {
    modify({
      variables: { id: id, payload: { title, first, last, email } }
    });
  };

  const toggleActiveId = (id: number | null) => {
    activeId == id ? setActiveId(null) : setActiveId(id);
  };

  const getPeople = (): Person[] => {
    const people = data.people;

    if (!query) return people;

    const options = {
      threshold: 0.2,
      useExtendedSearch: true,
      keys: ["fullName"]
    };

    const peopleWithFullName = people.map((p: Person) => {
      const { id, name, email } = p;
      return {
        id,
        name,
        email,
        fullName: getFullName(p)
      };
    });

    const fuse = new Fuse(peopleWithFullName, options);
    return fuse.search(query).map(p => p.item) as Person[];
  };

  // Render
  const renderPeople = () => {
    if (getPeople().length == 0) {
      return (
        <div className="errorWrapper">
          <div className="errorText"> No results for this search.</div>
          <div className="errorLink" onClick={() => setQuery("")}>
            Clear search
          </div>
        </div>
      );
    }

    return getPeople().map((person: Person) => {
      return (
        <PersonCard
          key={`${person.id}-${query}`}
          person={person}
          mutatedPerson={mutationData}
          active={activeId == person.id}
          toggleActiveId={toggleActiveId}
          submitModify={SubmitModify}
        />
      );
    });
  };

  const renderContent = () => {
    if (loading || !data) return <Loader />;

    return <div>{renderPeople()}</div>;
  };

  return (
    <Wrapper>
      <div className="headerWrapper">
        <div className="header">
          <div className="headerText">Firstbase Frontend Coding Challenge</div>
          <div className="headerSubtext">Completed by Austin Ban</div>
        </div>
      </div>
      <Body noFlex primary inset>
        <Input onChange={setQuery} value={query} placeholder="Search by name" />
      </Body>
      <Body inset>{renderContent()}</Body>
      <Footer />
    </Wrapper>
  );
}

export default People;
