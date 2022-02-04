import React, { useState, VoidFunctionComponent } from "react";
import { Note } from "./models/note.model";
import Header from "./components/Header";
import "./App.css";
import { Col, Container, Row } from "react-bootstrap";
import CreateNotes from "./components/CreateNotes";
import data from "./mock-data.json";
import "antd/dist/antd.css";
import { Modal } from "antd";
import { nanoid } from "nanoid";

// export interface Props {
//   handleOnDelete: (id: string | number) => void;
//   handleEditFormChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
//   handleEditFormSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
//   handleSubmit: (event: React.MouseEvent<HTMLButtonElement>) => void;
//   handleOnEdit: (
//     event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
//     note: any
//   ) => void;
//   handleOnCancel: () => void;
// }
function App() {
  const [editNoteId, seteditNoteId] = useState("" as string);
  const [notes, setnotes] = useState<Note[]>(data);
  const [editFormData, seteditFormData] = useState({
    id: nanoid(),
    title: "Meetings",
    text: "Schedule meeting with team",
  });

  const handleOnDelete = (id: string | number) => {
    console.log("click the delete button");
    Modal.confirm({
      title: "Are you sure you want to delete?",
      okText: "Yes",
      okType: "danger",
      cancelText: "Cancel",
      onCancel: handleOnCancel,
      onOk: () => {
        setnotes(notes.filter((note) => note.id !== id));
        console.log("Item deleted successfully!");
      },
    });
  };

  const handleEditFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    console.log(event.currentTarget);
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newformData = { ...editFormData };
    newformData[fieldName] = fieldValue;
    seteditFormData(newformData);
  };

  const handleEditFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(event.currentTarget);
    const editedEmp = {
      id: editNoteId,
      title: editFormData.title,
      text: editFormData.text,
    };

    const newNotes = [...notes];
    const index = notes.findIndex((note) => note.id === editNoteId);

    newNotes[index] = editedEmp;

    setnotes(newNotes);
    seteditNoteId(null);
  };

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log(event.currentTarget);
    const editedEmp = {
      id: editNoteId,
      title: editFormData.title,
      text: editFormData.text,
    };

    const newNotes = [...notes];
    const index = notes.findIndex((note) => note.id === editNoteId);

    newNotes[index] = editedEmp;

    setnotes(newNotes);
    seteditNoteId(null);
  };
  const handleOnEdit = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    note: any
  ) => {
    event.preventDefault();
    console.log(event.currentTarget);
    seteditNoteId(note.id);
    const formValues = {
      id: note.id,
      title: note.title,
      text: note.text,
    };
    seteditFormData(formValues);
  };

  const handleOnCancel = () => {
    seteditNoteId(null);
    console.log("canceled successfully!");
  };

  return (
    <>
      <Header />
      <Container className="mt-5">
        <div className="app-container">
          <form data-testid="app" onSubmit={handleEditFormSubmit}>
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Text</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody data-testid="tbody">
                {notes.map((note) => (
                  <>
                    {editNoteId === note.id ? (
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
                            className="button"
                            type="submit"
                            onClick={handleSubmit}
                            data-testid="submit"
                          >
                            Save
                          </button>
                          <button
                            className="button"
                            type="button"
                            onClick={handleOnCancel}
                            data-testid="cancel"
                          >
                            Cancel
                          </button>
                        </td>
                      </tr>
                    ) : (
                      <tr>
                        <td>{note.title}</td>
                        <td>{note.text}</td>
                        <td>
                          <button
                            className="button"
                            type="submit"
                            onClick={(event) => handleOnEdit(event, note)}
                          >
                            Edit
                          </button>

                          <button
                            className="button"
                            type="submit"
                            onClick={() => handleOnDelete(note.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </form>
        </div>

        <Row>
          <Col>
            <CreateNotes notes={notes} setnotes={setnotes} />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
