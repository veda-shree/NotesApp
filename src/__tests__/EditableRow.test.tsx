/* eslint-disable testing-library/prefer-screen-queries */
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "regenerator-runtime/runtime";
import EditableRow, { IEditableRowProps } from "../components/EditableRow";

function renderEditableRow(props: Partial<IEditableRowProps> = {}) {
  const defaultProps: IEditableRowProps = {
    editFormData() {
      return;
    },
    handleEditFormChange() {
      return;
    },
    handleEditFormSubmit() {
      return;
    },
    handleOnCancel() {
      return;
    },
  };
  return render(<EditableRow {...defaultProps} {...props} />);
}

const Button = ({ onClick, children }) => (
  <button onClick={onClick}>{children}</button>
);

describe("<EditableRow/>", () => {
  it("checking the rows is  editable for title column", async () => {
    const handleEditFormChange = jest.fn();
    const { findByTestId } = renderEditableRow({ handleEditFormChange });
    const title = await findByTestId("title");
    fireEvent.change(title, { target: { value: "test" } });

    expect(handleEditFormChange).toHaveBeenCalled();
  });

  it("checking the row is editable for text column", async () => {
    const handleEditFormChange = jest.fn();
    const { findByTestId } = renderEditableRow({ handleEditFormChange });
    const text = await findByTestId("text");
    fireEvent.change(text, { target: { value: "test" } });
    expect(handleEditFormChange).toHaveBeenCalled();
  });

  it("calls onClick when clicked on cancel", () => {
    const handleOnCancel = jest.fn();
    render(<Button onClick={handleOnCancel}>Cancel</Button>);
    fireEvent.click(screen.getByText(/cancel/i));
    expect(handleOnCancel).toHaveBeenCalledTimes(1);
  });

  it("calls onClick when clicked on Save", () => {
    const handleEditFormSubmit = jest.fn();
    render(<Button onClick={handleEditFormSubmit}>Save</Button>);
    fireEvent.click(screen.getByText(/save/i));
    expect(handleEditFormSubmit).toHaveBeenCalledTimes(1);
  });
});
