/* eslint-disable testing-library/prefer-screen-queries */
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import ReadOnlyRows, { IReadOnlyRowsProps } from "../components/ReadonlyRows";
import "regenerator-runtime/runtime";
import enzyme from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
// import { shallow, mount } from "enzyme";

enzyme.configure({ adapter: new Adapter() });
function renderReadOnlyRow(props: Partial<IReadOnlyRowsProps> = {}) {
  const defaultProps: IReadOnlyRowsProps = {
    mocknote() {
      return;
    },
    handleOnDelete() {
      return;
    },
    handleOnEdit() {
      return;
    },
  };
  return render(<ReadOnlyRows {...defaultProps} {...props} />);
}

// const Button = ({ onClick, children }) => (
//   <button onClick={onClick}>{children}</button>
// );

// describe("<ReadOnlyRows/>", () => {
//   it("calls onclick when clicked on pen", async () => {
//     const handleOnEdit = jest.fn();
//     render(<Button onClick={handleOnEdit}>Edit</Button>);
//     fireEvent.click(screen.getByText(/edit/i));
//     expect(handleOnEdit).toHaveBeenCalled();
//   });

//   it("calls onclick when clicked on trash", async () => {
//     const handleOnDelete = jest.fn();
//     render(<Button onClick={handleOnDelete}>Delete</Button>);
//     fireEvent.click(screen.getByText(/Delete/i));
//     // userEvent.click(screen.getByRole("Trash"));
//     expect(handleOnDelete).toHaveBeenCalled();
//   });
describe("<ReadOnlyRows/>", () => {
  it("calls onClick when clicked on delete and edit  button", () => {
    const handleOnDelete = jest.fn();
    const handleOnEdit = jest.fn();
    const mocknote = {
      title: "Learning Path",
      text: "complete ReactJs",
    };
    const { queryByText } = render(
      <ReadOnlyRows
        mocknote={mocknote}
        handleOnDelete={handleOnDelete}
        handleOnEdit={handleOnEdit}
      />
    );
    const button1 = queryByText("Edit");
    const button = queryByText("Delete");
    fireEvent.click(button1);
    fireEvent.click(button);
    expect(handleOnEdit).toHaveBeenCalledTimes(1);
    expect(handleOnDelete).toHaveBeenCalledTimes(1);
  });
  // it("should render the data in table", () => {
  //   const wrapper = shallow( <td>{mocknote.title}</td>);
  //   const td = wrapper.find('td');
  //   expect(wrapper.containsMatchingElement(<td>{mocknote.title}</td>)).toBe(
  //     true
  //   );
  // });
});
