// import { Input } from "antd";
// import Modal from "antd/lib/modal/Modal";
import * as React from "react";

export interface IEditableRowProps {
  editFormData: any;
  handleEditFormChange: (event: any) => void;
  handleEditFormSubmit: (event: any) => void;
  handleOnCancel: any;

  // editNoteId: boolean;
  // seteditNoteId: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditableRow: React.FunctionComponent<IEditableRowProps> = ({
  editFormData,
  handleEditFormChange,
  handleEditFormSubmit,
  handleOnCancel,
}) =>
  // editNoteId,
  // seteditNoteId,

  {
    return (
      <tr>
        <td>
          <input
            data-testid="title"
            type="text"
            placeholder="Enter title for the Note"
            name="title"
            value={editFormData.title}
            onChange={handleEditFormChange}
          ></input>
        </td>
        <td>
          <input
            data-testid="text"
            type="text"
            placeholder="Enter text for the Note"
            name="text"
            value={editFormData.text}
            onChange={handleEditFormChange}
          ></input>
        </td>
        <td>
          <button
            type="submit"
            onClick={handleEditFormSubmit}
            data-testid="submit"
          >
            Save
          </button>
          <button type="button" onClick={handleOnCancel} data-testid="cancel">
            Cancel
          </button>
        </td>
      </tr>
    );
  };
//     <Modal
//       title="Edit employee"
//       visible={editNoteId}
//       okText="Save"
//       onCancel={() => {
//         seteditNoteId(false);
//       }}
//       onOk={() => {
//         seteditNoteId(false);
//       }}
//     >
//       <Input>
//         <tr>
//           <td>
//             <input type="text" placeholder="Enter title for the Note"></input>
//           </td>
//           <td>
//             <input type="text" placeholder="Enter text for the Note"></input>
//           </td>
//         </tr>
//       </Input>
//     </Modal>
//   );
// };

export default EditableRow;
