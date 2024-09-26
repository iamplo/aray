import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./app";
import { MemoryRouter } from "react-router-dom";

test("App shows login form", () => {
  render(<App />);
});

test("app lands on login prompt", async () => {
  const { getByText } = render(<App />);
  expect(getByText("Repositories")).toBeTruthy();
});

test("form submit renders the repo list", async () => {
  const { getByTestId } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  const user = userEvent.setup();
  const input = getByTestId("input-name");
  const radio = getByTestId("radio-username");
  const button = screen.getByRole("button");

  await user.type(input, "iamplo");
  await user.click(radio);
  await user.click(button);
  expect(screen.getByText("Change Repo")).toBeTruthy();
});
