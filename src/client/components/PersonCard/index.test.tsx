import React from "react";
import { render, waitFor, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import PersonCard, { OwnProps } from "./index";
import { getFakePerson } from "../../../lib/test";

function renderComponent(props: Partial<OwnProps> = {}) {
  const defaultProps: OwnProps = {
    person: getFakePerson(),
    toggleActiveId() {
      return;
    },
    active: false,
    submitModify() {
      return;
    }
  };

  return render(<PersonCard {...defaultProps} {...props} />);
}

test("Inactive person - check classes - test toggle active", async () => {
  const toggleActiveId = jest.fn();
  renderComponent({ toggleActiveId });

  await waitFor(() => screen.getByRole("name"));

  expect(screen.getByRole("name")).toHaveTextContent("Austin Ban");
  expect(screen.getByRole("name")).not.toHaveClass("active");

  fireEvent.click(screen.getByRole("name"));

  expect(toggleActiveId).toBeCalled();
});

test("Active person - check classes - test submit button", async () => {
  const submitModify = jest.fn();

  renderComponent({ submitModify, active: true });

  await waitFor(() => screen.getByRole("name"));

  expect(screen.getByRole("name")).toHaveTextContent("Austin Ban");
  expect(screen.getByRole("name")).toHaveClass("active");

  fireEvent.click(screen.getByRole("submit"));
  expect(submitModify).toBeCalled();
});

test("Active person - modify name field", async () => {
  renderComponent({ active: true });

  await waitFor(() => screen.getByRole("name"));
  const firstNameInput = screen.getByRole("firstNameInput");

  expect(firstNameInput).toHaveValue("Austin");

  userEvent.type(firstNameInput, "Blah");

  expect(firstNameInput).toHaveValue("AustinBlah");
});
