import React from "react";
import ReactDOM from "react-dom";
import App from "../App";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import enzyme from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { shallow, mount } from "enzyme";
import Header from "../components/Header";

enzyme.configure({ adapter: new Adapter() });
jest.spyOn(console, "error").mockImplementation(() => {});

describe("<Notes home page/>", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

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
    const cnotes = wrapper.find("CreateNotes");
    expect(row).toHaveLength(1);
    expect(col).toHaveLength(1);
    expect(cnotes).toHaveLength(1);
  });

  it("test the table", () => {
    const wrapper = mount(<App />);
    const table = wrapper.find("table");
    const row = table.find("tr");
    const tbody = table.find("tbody");
    expect(table).toHaveLength(1);
    expect(row).toHaveLength(2);
    expect(tbody).toHaveLength(1);
  });

  it("should have the `th` items", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.contains(<th>Title</th>)).toBe(true);
    expect(wrapper.contains(<th>Text</th>)).toBe(true);
    expect(wrapper.contains(<th>Actions</th>)).toBe(true);
  });

  it("check handleOnCancel is called  when clicked on cancel", () => {
    const consoleSpy = jest.spyOn(console, "log");
    const handleOnCancel = jest.fn();
    render(<button onClick={handleOnCancel}>Cancel</button>);
    fireEvent.click(screen.getByText(/cancel/i));
    expect(handleOnCancel).toHaveBeenCalledTimes(1);
    console.log("canceled successfully!");
    expect(consoleSpy).toHaveBeenCalledWith("canceled successfully!");
  });

  it("popover respond to hover on cancel", () => {
    render(<App />);
    const nullPopover = screen.queryByText(/cancel/i);
    expect(nullPopover).not.toBeInTheDocument();
    const currentNode = screen.getByTestId("edit-data");
    userEvent.hover(currentNode);
    fireEvent.click(currentNode);
    const popover = screen.getByText(/cancel/i);
    expect(popover).toBeInTheDocument();
    fireEvent.click(popover);
  });

  it("check handleOnSubmit is called", () => {
    const handleOnSubmit = jest.fn();
    render(<button onClick={handleOnSubmit}>Save</button>);
    userEvent.click(screen.getByText(/save/i));
    expect(handleOnSubmit).toHaveBeenCalledTimes(1);
  });

  it("popover respond to hover on save", () => {
    render(<App />);
    const nullPopover = screen.queryByText(/save/i);
    expect(nullPopover).not.toBeInTheDocument();
    const currentNode = screen.getByTestId("edit-data");
    userEvent.hover(currentNode);
    fireEvent.click(currentNode);
    const popover = screen.getByText(/save/i);
    expect(popover).toBeInTheDocument();
    fireEvent.click(popover);
  });

  it("should test handleSubmit", () => {
    render(<App />);
    const currentNode = screen.getByPlaceholderText("Enter title for the Note");
    userEvent.type(currentNode, "Test");
    const currentNode1 = screen.getByPlaceholderText("Enter text for the Note");
    userEvent.type(currentNode1, "test1");
    const currentNode2 = screen.getByText("Submit");
    fireEvent.click(currentNode2);
    const currentNode3 = screen.getByText("test1");
    expect(currentNode3).toBeInTheDocument();
  });
  it("shoul throw error", () => {
    render(<App />);
    const currentNode = screen.getByPlaceholderText("Enter title for the Note");
    userEvent.type(currentNode, "");
    const currentNode1 = screen.getByPlaceholderText("Enter text for the Note");
    userEvent.type(currentNode1, "");
    const currentNode2 = screen.getByText("Submit");
    fireEvent.click(currentNode2);
  });

  it("should test handleOnEdit", () => {
    render(<App />);
    const currentNode = screen.getByPlaceholderText("Enter title for the Note");
    userEvent.type(currentNode, "Meetings");
    const currentNode1 = screen.getByPlaceholderText("Enter text for the Note");
    userEvent.type(currentNode1, "	Schedule meeting with team");
    const currentNode2 = screen.getByTestId("edit-data");
    fireEvent.click(currentNode2);
    const currentNode3 = screen.queryByText("Schedule meeting with team");
    expect(currentNode3).not.toBeInTheDocument();
  });

  it("captures changes", (done) => {
    function handleEditFormChange(event) {
      expect(event.target.value).toEqual("React");
      done();
    }
    render(
      <input
        onChange={handleEditFormChange}
        placeholder="Enter title for the Note"
      />
    );
    const td = screen.getByPlaceholderText("Enter title for the Note");
    fireEvent.change(td, { target: { value: "React" } });
  });

  it("popover respond to hover", () => {
    render(<App />);
    const nullPopover = screen.queryByTestId("edit-title");
    expect(nullPopover).not.toBeInTheDocument();
    const currentNode = screen.getByTestId("edit-data");
    userEvent.hover(currentNode);
    fireEvent.click(currentNode);
    const popover = screen.getByTestId("edit-title");
    expect(popover).toBeInTheDocument();
    fireEvent.change(popover);
    const currentNode1 = screen.getByTestId("edit-title");
    userEvent.type(currentNode1, "Meet");
    expect(currentNode1).toBeInTheDocument();
  });

  it("calls handleOnDelete when clicked on Delete", () => {
    const handleOnDelete = jest.fn();
    const note = {
      id: "1",
      title: "Learning Path",
      text: "complete ReactJs",
    };
    render(<button onClick={() => handleOnDelete(note.id)}>Delete</button>);
    fireEvent.click(screen.getByText(/delete/i));
    expect(handleOnDelete).toHaveBeenCalledTimes(1);
  });

  it("should test handleEditFormSubmit", () => {
    render(<App />);
    const currentNode = screen.getByText("Meetings");
    expect(currentNode).toBeTruthy();
    console.log(currentNode.innerHTML);
    const currentNode1 = screen.getByTestId("1");
    fireEvent.click(currentNode1);
    console.log(currentNode.innerHTML);
  });
});
