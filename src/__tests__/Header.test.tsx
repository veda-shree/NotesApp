/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/no-render-in-setup */
import React from "react";
import { render, RenderResult } from "@testing-library/react";
import Header from "../components/Header";
import "@testing-library/jest-dom/extend-expect";

// import { unmountComponentAtNode } from "react-dom";
// import ReactDOM from "react-dom";
// import { Navbar, NavbarBrand } from "react-bootstrap";
// import enzyme from "enzyme";
// import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
// import { shallow } from "enzyme";

// enzyme.configure({ adapter: new Adapter() });
// // it("Header contains correct text", () => {
// //   render(<Header />);
// //   expect(screen.getByRole("React Typescript")).toBeInTheDocument();
// //   // const { container } = render(<Header />);
// //   // container.querySelector(".my-class");
// // });
// let container = null;
// beforeEach(() => {
//   container = document.createElement("div");
//   document.body.appendChild(container);
// });
// afterEach(() => {
//   unmountComponentAtNode(container);
//   container.remove();
//   container = null;
// });
// describe("<Header/>", () => {
//   it("renders without crashing", () => {
//     const div = document.createElement("div");
//     ReactDOM.render(<Header />, div);
//   });
//   it("should render the data in table", () => {
//     const wrapper = shallow(<Navbar />);
//     const navbar = wrapper.find("Navbar.Brand");
//     expect(
//       wrapper.containsMatchingElement(
//         <Navbar.Brand>React Typescript</Navbar.Brand>
//       )
//     ).toBe(true);
//   });
let documentBody: RenderResult;
describe("<Header/>", () => {
  beforeEach(() => {
    documentBody = render(<Header />);
  });
  it("shows header text", () => {
    expect(documentBody.getByText("React Typescript")).toBeInTheDocument();
  });
});
