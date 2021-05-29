import React, { useState, useEffect } from "react";
import Fuse from "fuse.js";
import "./index.scss";
import { Person } from "../../../lib/types";
import { getFullName } from "../../../lib/person";
import Input from "../../components/Input";
import Body from "../../components/Body";
import Footer from "../../components/Footer";
import Wrapper from "../../components/Wrapper";
import PeopleList from "../../components/PeopleList";
import Loader from "../../components/Loader";
import Header from "../../components/Header";
import { LazyLoadPeople } from "../../../server/actions/lazyLoadPeople";
import { ModifyPerson } from "../../../server/actions/modifyPerson";

function People() {
  const [activeId, setActiveId] = useState<number | null>(null);
  const [query, setQuery] = useState("");

  const { loadPeople, loading, data } = LazyLoadPeople();
  const { SubmitModify } = ModifyPerson();

  // Effects
  useEffect(() => {
    if (!data) loadPeople();
  }, [data]);

  // Functions
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

  const renderContent = () => {
    if (loading || !data) return <Loader />;

    return (
      <PeopleList
        people={getPeople()}
        query={query}
        setQuery={setQuery}
        activeId={activeId}
        toggleActiveId={toggleActiveId}
        submitModify={SubmitModify}
      />
    );
  };

  return (
    <Wrapper>
      <Header />
      <Body noFlex primary inset>
        <Input onChange={setQuery} value={query} placeholder="Search by name" />
      </Body>
      <Body inset>{renderContent()}</Body>
      <Footer />
    </Wrapper>
  );
}

export default People;
