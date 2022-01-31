import React from "react";
import ReactDOM from "react-dom";
import App from "../App";
import enzyme from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { shallow, mount } from "enzyme";
import Header from "../components/Header";

enzyme.configure({ adapter: new Adapter() });

describe("<Notes home page/>", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<App />, div);
  });
  it("renders header component", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.contains(<Header />)).toBe(true);
  });
  it("check the conatiner", () => {
    const wrapper = mount(<App />);
    const row = wrapper.find("Row");
    const col = wrapper.find("Col");
    const nlist = wrapper.find("NotesList");
    const cnotes = wrapper.find("CreateNotes");
    expect(row).toHaveLength(2);
    expect(col).toHaveLength(2);
    expect(nlist).toHaveLength(1);
    expect(cnotes).toHaveLength(1);
  });
  it("test the table", () => {
    const wrapper = mount(<App />);
    const table = wrapper.find("table");
    const row = table.find("tr");
    const tbody = table.find("tbody");
    const editrow = tbody.find("EditableRow");
    const readrow = tbody.find("ReadOnlyRows");
    expect(table).toHaveLength(1);
    expect(row).toHaveLength(3);
    expect(tbody).toHaveLength(1);
    expect(editrow).toHaveLength(0);
    expect(readrow).toHaveLength(2);
  });
  it("should have the `th` items", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.contains(<th>Title</th>)).toBe(true);
    expect(wrapper.contains(<th>Text</th>)).toBe(true);
    expect(wrapper.contains(<th>Actions</th>)).toBe(true);
  });
  it("calls onSubmit when form is submitted", () => {
    const handleEditFormSubmit = jest.fn();
    const wrapper = mount(<form onSubmit={handleEditFormSubmit} />);
    const form = wrapper.find("form");
    form.simulate("submit");
    expect(handleEditFormSubmit).toHaveBeenCalledTimes(1);
  });
});
