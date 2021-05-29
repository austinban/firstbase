import React from "react";
import { render, waitFor, screen } from "@testing-library/react";

import Wrapper from "./index";

function renderComponent() {
  return render(
    <Wrapper>
      <div>Content</div>
    </Wrapper>
  );
}

test("Wrapper renders normally", async () => {
  renderComponent();

  const component = screen.getByRole("wrapper");

  await waitFor(() => component);

  expect(component).toHaveTextContent("Content");
});
