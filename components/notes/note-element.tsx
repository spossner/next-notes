import { Note } from "@prisma/client";

const NoteElement = ({
  note,
  onRemove,
}: {
  note: Note;
  onRemove: (id: number) => void;
}) => {
  return (
    <div className="py-2">
      <div className="flex justify-between">
        <h2 className="text-lg font-semibold">{note.title}</h2>
        <button
          onClick={() => onRemove(note.id)}
          className="bg-red-500 text-white py-1 px-2 text-xs rounded-md align-middle"
        >
          X
        </button>
      </div>
      <h4 className="text-xs text-gray-400 italic">
        {note.createdAt.toDateString()}
      </h4>
      <p className="font-serif italic">{note.content}</p>
    </div>
  );
};
export default NoteElement;
