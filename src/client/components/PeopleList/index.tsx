import React, { FC, Fragment } from "react";
import { Person, SubmitModifyParams } from "../../../lib/types";
import PersonCard from "../PersonCard";

import "./index.scss";

export type OwnProps = {
  people: Person[];
  query: string;
  setQuery: (query: string) => void;
  activeId: number | null;
  toggleActiveId: (id: number | null) => void;
  submitModify: (params: SubmitModifyParams) => void;
};

const PeopleList: FC<OwnProps> = ({
  people,
  setQuery,
  query,
  activeId,
  toggleActiveId,
  submitModify
}: OwnProps) => {
  // Partials
  if (people.length == 0) {
    return (
      <div className="errorWrapper">
        <div className="errorText"> No results for this search.</div>
        <div className="errorLink" onClick={() => setQuery("")}>
          Clear search
        </div>
      </div>
    );
  }

  return (
    <Fragment>
      {people.map((person: Person) => {
        return (
          <PersonCard
            key={`${person.id}-${query}`}
            person={person}
            active={activeId == person.id}
            toggleActiveId={toggleActiveId}
            submitModify={submitModify}
          />
        );
      })}
    </Fragment>
  );
};

export default PeopleList;
