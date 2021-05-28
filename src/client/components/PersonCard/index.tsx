import React, { useState, FC, useRef, useEffect } from "react";
import { Person } from "../../../lib/types";
import Input from "../Input";
import FadeIn from "../FadeIn";
import Button from "../Button";

import "./index.scss";
var classNames = require("classnames");

export type OwnProps = {
  person: Person;
  mutatedPerson?: Person;
  toggleActiveId: (id: number | null) => void;
  active?: boolean;
  submitModify: (
    id: number,
    first: string,
    last: string,
    title: string,
    email: string
  ) => void;
};

const PersonCard: FC<OwnProps> = ({
  person,
  active,
  toggleActiveId,
  submitModify
}: OwnProps) => {
  const { name } = person;
  const [first, setFirst] = useState(name.first || "");
  const [last, setLast] = useState(name.last || "");
  const [title, setTitle] = useState(name.title || "");
  const [email, setEmail] = useState(person.email || "");
  const ref = useRef<HTMLInputElement>(null);

  // Effects
  useEffect(() => {
    if (active) {
      document.addEventListener("mousedown", escapeListener);

      return () => {
        document.removeEventListener("mousedown", escapeListener);
      };
    }
  }, [active]);

  // Functions
  const undoChanges = () => {
    setFirst(person.name.first);
    setLast(person.name.last);
    setTitle(person.name.title);
  };

  const isDisabled = () => {
    return name.title == title && name.last == last && name.first == first;
  };

  const escapeListener = (e: MouseEvent) => {
    if (
      e.target instanceof Node &&
      ref.current &&
      !ref.current.contains(e.target)
    ) {
      toggleActiveId(null);
    }
  };

  // Partials
  const renderClose = () => {
    return (
      <div
        className={classNames("closeIcon", { active })}
        onClick={() => toggleActiveId(person.id)}
      >
        <svg
          viewBox="0 0 21.256 21.256"
          width="100%"
          height="100%"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          stroke="#fe27b5"
        >
          <g transform="translate(10.628 -7.799) rotate(45)">
            <line y2="26.06" transform="translate(13.03 0)" />
            <line y2="26.06" transform="translate(26.06 13.03) rotate(90)" />
          </g>
        </svg>
      </div>
    );
  };

  return (
    <FadeIn>
      <div
        key={person.id}
        ref={ref}
        className={classNames("personWrapper", { active })}
      >
        {renderClose()}
        <div
          className={classNames("personName", { active })}
          onClick={() => toggleActiveId(person.id)}
        >
          <div className={classNames("personTitle")}>{name.title}</div>{" "}
          {name.first} {name.last}
          <div className={classNames("idString")}>- ID: {person.id}</div>
        </div>
        <div className={classNames("personContentWrapper", { active })}>
          <div className={classNames("inputs")}>
            <Input
              label={"Title"}
              onChange={setTitle}
              value={title}
              placeholder="Title"
            />
            <Input
              label={"First Name"}
              onChange={setFirst}
              value={first}
              placeholder="First Name"
            />
            <Input
              label={"Last Name"}
              onChange={setLast}
              value={last}
              placeholder="Last Name"
            />
          </div>

          <div className={classNames("buttonWrapper")}>
            <Button grey disabled={isDisabled()} onClick={undoChanges}>
              Undo
            </Button>
            <Button
              disabled={isDisabled()}
              onClick={() => submitModify(person.id, first, last, title, email)}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </FadeIn>
  );
};

export default PersonCard;
