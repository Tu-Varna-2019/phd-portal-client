import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Page from "../../../../src/app/candidate/(home)/page.jsx";

describe("Page", () => {
  it("renders a heading", () => {
    render(<Page />);

    const progressbar = screen.getByRole("progressbar");

    expect(progressbar).toBeInTheDocument();
  });
});

it("renders homepage unchanged", () => {
  const { container } = render(<Page />);
  expect(container).toMatchSnapshot();
});
