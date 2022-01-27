import * as React from "react";
import Notes from "./Notes";
import { Note } from "../models/note.model";

interface INotesListProps {
  notes: Note[];
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
  mocknotes: Note[];
  setmocknotes: React.Dispatch<React.SetStateAction<Note[]>>;
}

const NotesList: React.FC<INotesListProps> = ({
  notes,
  setNotes,
  mocknotes,
  setmocknotes,
}) => {
  const handleDelete = (id: string | number) => {
    setNotes(notes.filter((note) => note.id !== id));
    setmocknotes(mocknotes.filter((mocknote) => mocknote.id !== id));
  };
  const renderNotes = (): JSX.Element[] => {
    return notes.map((note) => {
      return <Notes key={note.id} note={note} handleDelete={handleDelete} />;
    });
  };

  return (
    <>
      <h2 className="mt-3">Notes</h2>
      <div>{renderNotes()}</div>
    </>
  );
};

export default NotesList;
