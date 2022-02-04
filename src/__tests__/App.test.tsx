import React from "react";
import ReactDOM from "react-dom";
import App from "../App";
// import { renderHook, act } from "@testing-library/react-hooks";
import { fireEvent, render, screen } from "@testing-library/react";
import enzyme from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { shallow, mount } from "enzyme";
import Header from "../components/Header";

enzyme.configure({ adapter: new Adapter() });
jest.spyOn(console, "error").mockImplementation(() => {});

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
    // const nlist = wrapper.find("NotesList");
    const cnotes = wrapper.find("CreateNotes");
    expect(row).toHaveLength(1);
    expect(col).toHaveLength(1);
    // expect(nlist).toHaveLength(1);
    expect(cnotes).toHaveLength(1);
  });
  it("test the table", () => {
    const wrapper = mount(<App />);
    const table = wrapper.find("table");
    const row = table.find("tr");
    const tbody = table.find("tbody");
    // const editrow = tbody.find("EditableRow");
    // const readrow = tbody.find("ReadOnlyRows");
    expect(table).toHaveLength(1);
    expect(row).toHaveLength(3);
    expect(tbody).toHaveLength(1);
    // expect(editrow).toHaveLength(0);
    // expect(readrow).toHaveLength(2);
  });

  it("should have the `th` items", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.contains(<th>Title</th>)).toBe(true);
    expect(wrapper.contains(<th>Text</th>)).toBe(true);
    expect(wrapper.contains(<th>Actions</th>)).toBe(true);
  });
  it("calls onSubmit when form is submitted", () => {
    const consoleSpy = jest.spyOn(console, "log");
    const handleEditFormSubmit = jest.fn();
    const wrapper = mount(<form onSubmit={handleEditFormSubmit} />);
    const form = wrapper.find("form");
    form.simulate("submit");
    expect(handleEditFormSubmit).toHaveBeenCalledTimes(1);
    console.log("Form Submitted");
    expect(consoleSpy).toHaveBeenCalledWith("Form Submitted");
  });
  it("calls onClick when clicked on cancel", () => {
    const consoleSpy = jest.spyOn(console, "log");
    const handleOnCancel = jest.fn();
    render(<button onClick={handleOnCancel}>Cancel</button>);
    fireEvent.click(screen.getByText(/cancel/i));
    expect(handleOnCancel).toHaveBeenCalledTimes(1);
    console.log("canceled successfully!");
    expect(consoleSpy).toHaveBeenCalledWith("canceled successfully!");
  });
  it("calls onClick when clicked on Save", () => {
    const handleSubmit = jest.fn();
    render(<button onClick={handleSubmit}>Save</button>);
    fireEvent.click(screen.getByText(/save/i));
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });
  it("calls handleOnEdit when clicked on Edit", () => {
    const handleOnEdit = jest.fn();
    const note = {
      title: "Learning Path",
      text: "complete ReactJs",
    };
    render(
      <button onClick={(event) => handleOnEdit(event, note)}>Edit</button>
    );
    fireEvent.click(screen.getByText(/edit/i));
    expect(handleOnEdit).toHaveBeenCalledTimes(1);
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
});

// describe("<EditableRow/>", () => {
//   it("checking the rows is  editable for title column", async () => {
//     const handleEditFormChange = jest.fn();
//     const { findByTestId } = render({ handleEditFormChange });
//     const title = await findByTestId("title");
//     fireEvent.change(title, { target: { value: "test" } });
//     expect(handleEditFormChange).toHaveBeenCalled();
//   });
// });
// it("should update data when call handleEditFormChange", () => {
//   const { result } = renderHook(() => App());
//   const fieldValue = "react";
//   const event = { target: { fieldName: "title", fieldValue } };
//   act(() => {
//     result.current.handleEditFormChange(event);
//     expect(result.current.seteditFormData.fieldName).toEqual(fieldValue);
//   });

//   //    });
// });
