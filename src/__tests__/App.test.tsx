import React from "react";
import ReactDOM from "react-dom";
import App from "../App";

describe("<Notes home page/>", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<App />, div);
  });
});
