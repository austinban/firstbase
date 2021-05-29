import React from "react";
import { render, waitFor, screen } from "@testing-library/react";

import Loader from "./index";

function renderComponent() {
  return render(<Loader />);
}

test("Loader renders normally", async () => {
  renderComponent();

  await waitFor(() => screen.getByRole("loader"));

  expect(screen.getByRole("loader"));
});
