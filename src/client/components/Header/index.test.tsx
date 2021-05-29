import React from "react";
import { render, waitFor, screen } from "@testing-library/react";

import Header from "./index";

function renderComponent() {
  return render(<Header />);
}

test("Header renders normally", async () => {
  renderComponent();

  await waitFor(() => screen.getByRole("header"));

  expect(screen.getByRole("header")).toHaveTextContent("Frontend");
});
