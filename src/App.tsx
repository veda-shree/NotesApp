import React, { useState } from "react";
import { Note } from "./models/note.model";
import Header from "./components/Header";
import "./App.css";
import { Col, Container, Row } from "react-bootstrap";
import NotesList from "./components/NotesList";
import CreateNotes from "./components/CreateNotes";
import data from "./mock-data.json";
import ReadOnlyRows from "./components/ReadonlyRows";
import EditableRow from "./components/EditableRow";
import { nanoid } from "nanoid";
import "antd/dist/antd.css";
import { Modal } from "antd";

function App() {
  const [editNoteId, seteditNoteId] = useState(null);

  const [mocknotes, setmocknotes] = useState<Note[]>(data);
  const [notes, setNotes] = useState<Note[]>([
    {
      id: nanoid(),
      title: "Meetings",
      text: "Schedule meeting with team",
      color: "#dfdfdf",
      date: new Date().toString(),
    },
  ]);
  const [editFormData, seteditFormData] = useState({
    id: nanoid(),
    title: "Meetings",
    text: "Schedule meeting with team",
    color: "#dfdfdf",
    date: new Date().toString(),
  });

  const handleOnDelete = (id: string | number) => {
    Modal.confirm({
      title: "Are you sure you want to delete?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        setmocknotes(mocknotes.filter((mocknote) => mocknote.id !== id));
      },
    });
  };

  const handleEditFormChange = (event: any) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newformData = { ...editFormData };
    newformData[fieldName] = fieldValue;
    seteditFormData(newformData);
  };

  const handleEditFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const editedEmp = {
      id: editNoteId,
      title: editFormData.title,
      text: editFormData.text,
      color: editFormData.color,
      date: editFormData.date,
    };

    const newMockNotes = [...mocknotes];
    const index = mocknotes.findIndex(
      (mocknote) => mocknote.id === editNoteId.id
    );

    newMockNotes[index] = editedEmp;

    setmocknotes(newMockNotes);
    seteditNoteId(null);
  };
  const handleOnEdit = (event: any, mocknote: any) => {
    event.preventDefault();
    seteditNoteId(mocknote.id);

    const formValues = {
      id: mocknote.id,
      title: mocknote.title,
      text: mocknote.text,
      color: mocknote.color,
      date: mocknote.date,
    };
    seteditFormData(formValues);
  };

  const handleOnCancel = () => {
    seteditNoteId(null);
  };
  return (
    <>
      <Header />
      <Container className="mt-5">
        <Row>
          <Col>
            <NotesList
              notes={notes}
              setNotes={setNotes}
              mocknotes={mocknotes}
              setmocknotes={setmocknotes}
            />
          </Col>
        </Row>

        <div className="app-container">
          <form data-testid="table" onSubmit={handleEditFormSubmit}>
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Text</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {mocknotes.map((mocknote) => (
                  <>
                    {editNoteId === mocknote.id ? (
                      <EditableRow
                        key={mocknote.id}
                        editFormData={editFormData}
                        handleEditFormChange={handleEditFormChange}
                        handleOnCancel={handleOnCancel}
                        handleEditFormSubmit={handleEditFormSubmit}
                      />
                    ) : (
                      <ReadOnlyRows
                        mocknote={mocknote}
                        handleOnDelete={handleOnDelete}
                        handleOnEdit={handleOnEdit}
                      />
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </form>
        </div>

        <Row>
          <Col>
            <CreateNotes
              notes={notes}
              setNotes={setNotes}
              mocknotes={mocknotes}
              setmocknotes={setmocknotes}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
