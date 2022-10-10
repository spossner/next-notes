import { Note } from "@prisma/client";
import NoteElement from "./note-element";

const NotesList = ({
    notes,
    onRemove,
    onEdit,
}: {
    notes: Note[];
    onRemove: (id: number) => void;
    onEdit: (id: number) => void;
}) => {
    return (
        <div>
            {notes?.map((note) => (
                <NoteElement key={note.id} note={note} onRemove={onRemove} onEdit={onEdit} />
            ))}
        </div>
    );
};
export default NotesList;
