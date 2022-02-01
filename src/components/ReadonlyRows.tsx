import * as React from "react";
// import { Pen, Trash } from "react-bootstrap-icons";

export interface IReadOnlyRowsProps {
  mocknote: any;
  handleOnDelete: (id: string | number) => void;
  // seteditNotes: React.Dispatch<React.SetStateAction<null>>;
  handleOnEdit: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    mocknote: any
  ) => void;
}

const ReadOnlyRows: React.FunctionComponent<IReadOnlyRowsProps> = ({
  mocknote,
  handleOnDelete,
  handleOnEdit,
}) => {
  return (
    <tr>
      <td>{mocknote.title}</td>
      <td>{mocknote.text}</td>
      <td>
        {/* <Pen
          onClick={(event) => handleOnEdit(event, mocknote)}
          style={{ color: "blue" }}
          data-testid="edit"
        /> */}
        <button
          type="submit"
          onClick={(event) => handleOnEdit(event, mocknote)}
          data-testid="edit"
        >
          Edit
        </button>

        {/* <Trash
          onClick={() => handleOnDelete(mocknote.id)}
          style={{ color: "red", marginLeft: "12px" }}
          data-testid="trash"
        /> */}
        <button
          type="submit"
          onClick={() => handleOnDelete(mocknote.id)}
          data-testid="Delete"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};
export default ReadOnlyRows;
