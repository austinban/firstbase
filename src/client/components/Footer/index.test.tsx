import React from "react";
import { render, waitFor, screen } from "@testing-library/react";

import Footer from "./index";

function renderComponent() {
  return render(<Footer />);
}

test("Footer renders normally", async () => {
  renderComponent();

  await waitFor(() => screen.getByRole("footer"));

  expect(screen.getByRole("footer")).toHaveTextContent("Austin's Links");
});
