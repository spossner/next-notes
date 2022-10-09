import { Note } from "@prisma/client";
import { FormEvent, useState } from "react";

interface FormData {
  title: string;
  content: string;
}

const initialForm = { title: "", content: "" };

const NoteForm = ({
  onAdd,
}: {
  onAdd: (title: string, content: string) => void;
}) => {
  const [form, setForm] = useState<FormData>(initialForm);
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const { title, content } = form;
    onAdd(title, content);
    setForm(initialForm);
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="w-auto max-w-md mx-auto flex flex-col space-y-6"
    >
      <input
        type="text"
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        className="border rounded border-gray-300 p-1"
      />
      <textarea
        placeholder="Content"
        value={form.content}
        onChange={(e) => setForm({ ...form, content: e.target.value })}
        className="border rounded border-gray-300 p-1"
      ></textarea>
      <button className="bg-blue-500 text-white rounded p-1" type="submit">
        Add note
      </button>
    </form>
  );
};
export default NoteForm;
