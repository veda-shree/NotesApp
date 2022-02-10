/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/no-render-in-setup */
import React from "react";
import { render, RenderResult } from "@testing-library/react";
import Header from "../components/Header";
import "@testing-library/jest-dom/extend-expect";

let documentBody: RenderResult;
describe("<Header/>", () => {
  beforeEach(() => {
    documentBody = render(<Header />);
  });
  it("shows header text", () => {
    expect(documentBody.getByText("React Typescript")).toBeInTheDocument();
  });
});
