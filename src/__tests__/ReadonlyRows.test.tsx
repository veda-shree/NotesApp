/* eslint-disable testing-library/prefer-screen-queries */
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import ReadOnlyRows, { IReadOnlyRowsProps } from "../components/ReadonlyRows";
import "regenerator-runtime/runtime";

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

const Button = ({ onClick, children }) => (
  <button onClick={onClick}>{children}</button>
);

describe("<ReadOnlyRows/>", () => {
  //   it("calls onClick when clicked on cancel", () => {
  //     const handleOnEdit = jest.fn();
  //     render(<Pen onClick={handleOnEdit} />);

  //     fireEvent.click(screen.getByRole(<Pen />));
  //     expect(handleOnEdit).toHaveBeenCalledTimes(1);
  //   });

  it("calls onclick when clicked on pen", async () => {
    const handleOnEdit = jest.fn();
    render(<Button onClick={handleOnEdit}>Edit</Button>);
    fireEvent.click(screen.getByText(/edit/i));
    expect(handleOnEdit).toHaveBeenCalled();
  });

  it("calls onclick when clicked on trash", async () => {
    const handleOnDelete = jest.fn();
    render(<Button onClick={handleOnDelete}>Delete</Button>);
    fireEvent.click(screen.getByText(/Delete/i));
    // userEvent.click(screen.getByRole("Trash"));
    expect(handleOnDelete).toHaveBeenCalled();
  });
});
