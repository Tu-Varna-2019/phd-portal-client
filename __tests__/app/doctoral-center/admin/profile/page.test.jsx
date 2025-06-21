import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Page from "../../../../../src/app/doctoral-center/admin/profile/page.jsx";

import { storeMockProvider } from "../../../../../__mocks__/store.jsx";

describe("Page", () => {
  it("renders a heading", () => {
    const container = render(<Page />, { wrapper: storeMockProvider });
    expect(container).toMatchSnapshot();

    const progressbar = screen.getByRole("img", { name: "admin" });
    expect(progressbar).toBeInTheDocument();
  });
});
