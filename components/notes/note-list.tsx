import { Note } from "@prisma/client";
import NoteElement from "./note-element";

const NotesList = ({
  notes,
  onRemove,
}: {
  notes: Note[];
  onRemove: (id: number) => void;
}) => {
  return (
    <div>
      {notes?.map((note) => (
        <NoteElement key={note.id} note={note} onRemove={onRemove} />
      ))}
    </div>
  );
};
export default NotesList;
