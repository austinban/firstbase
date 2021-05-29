import React from "react";
import { render, waitFor, screen } from "@testing-library/react";

import FadeIn from "./index";

function renderComponent() {
  return render(
    <FadeIn>
      <div>Content</div>
    </FadeIn>
  );
}

test("FadeIn renders normally", async () => {
  renderComponent();

  await waitFor(() => screen.getByRole("fade"));

  expect(screen.getByRole("fade")).toHaveTextContent("Content");
});
