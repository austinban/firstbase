import React from "react";
import { render, waitFor, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Input, { OwnProps } from "./index";

function renderComponent(props: Partial<OwnProps> = {}) {
  const defaultProps: OwnProps = {
    value: "",
    onChange() {
      return;
    },
    placeholder: "",
    label: "",
    role: "input"
  };

  return render(<Input {...defaultProps} {...props} />);
}

test("Input renders normally - check label passing - check changed content", async () => {
  const onChange = jest.fn();

  renderComponent({
    onChange,
    value: "test",
    label: "label"
  });

  const inputComponent = screen.getByRole("input");
  const labelComponent = screen.getByRole("label");

  expect(labelComponent).toHaveTextContent("label");

  userEvent.type(inputComponent, "Blah");
  expect(onChange).toBeCalledTimes(4);
});
