import React from "react";
import { render, waitFor, screen } from "@testing-library/react";

import Body, { OwnProps } from "./index";

function renderComponent(props: Partial<OwnProps> = {}) {
  const defaultProps: OwnProps = {
    noFlex: false,
    inset: false,
    primary: false,
    children: <div>Content</div>
  };

  return render(<Body {...defaultProps} {...props} />);
}

test("Body renders normally - check class toggles", async () => {
  renderComponent({ inset: true, primary: false });
  const element = screen.getByRole("body");

  await waitFor(() => element);

  expect(element).toHaveClass("inset");
  expect(element).not.toHaveClass("primary");
  expect(element).toHaveTextContent("Content");
});
