import React from "react";
import { render, waitFor, screen } from "@testing-library/react";

import PeopleList, { OwnProps } from "./index";
import { getFakePeople } from "../../../lib/test";

function renderComponent(props: Partial<OwnProps> = {}) {
  const defaultProps: OwnProps = {
    people: getFakePeople(),
    query: "",
    setQuery() {
      return;
    },
    activeId: null,
    toggleActiveId() {
      return null;
    },
    submitModify() {
      return null;
    }
  };

  return render(<PeopleList {...defaultProps} {...props} />);
}

test("People list renders all passed people", async () => {
  renderComponent();

  const component1 = screen.getByText("Austin Ban");
  const component2 = screen.getByText("Callie Ban");
  const component3 = screen.getByText("Marigold Ban");

  expect(component1);
  expect(component2);
  expect(component3);
});
