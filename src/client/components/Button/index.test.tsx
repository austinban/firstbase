import React from "react";
import { render, waitFor, screen, fireEvent } from "@testing-library/react";

import Button, { OwnProps } from "./index";

function renderComponent(props: Partial<OwnProps> = {}) {
  const defaultProps: OwnProps = {
    onClick() {
      return null;
    },
    disabled: false,
    grey: false,
    role: undefined,
    children: "Content"
  };

  return render(<Button {...defaultProps} {...props} />);
}

test("Button renders normally - check onClick - check classes", async () => {
  const submitModify = jest.fn();

  renderComponent({
    onClick: submitModify,
    role: "button",
    disabled: false,
    grey: true
  });

  const element = screen.getByRole("button");

  await waitFor(() => element);

  expect(element).toHaveClass("grey");
  expect(element).not.toHaveClass("disabled");
  expect(element).toHaveTextContent("Content");

  fireEvent.click(element);

  expect(submitModify).toBeCalled();
});
