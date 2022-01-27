/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/no-render-in-setup */
import React from "react";
import { render, RenderResult } from "@testing-library/react";

import Header from "../components/Header";

// it("Header contains correct text", () => {
//   render(<Header />);
//   expect(screen.getByRole("React Typescript")).toBeInTheDocument();
//   // const { container } = render(<Header />);
//   // container.querySelector(".my-class");
// });

let documentBody: RenderResult;
describe("<Header/>", () => {
  beforeEach(() => {
    documentBody = render(<Header />);
  });
  it("shows header text", () => {
    expect(documentBody.getByText("React Typescript")).toBeInTheDocument();
  });
});
