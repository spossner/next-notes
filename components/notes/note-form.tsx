import { Note } from "@prisma/client";
import { FormEvent, useEffect, useState } from "react";

interface FormData {
    id?: number;
    title: string;
    content: string;
}

const initialForm = { title: "", content: "" };

const NoteForm = ({
    onAddOrUpdate,
    note,
}: {
    onAddOrUpdate: (title: string, content: string, id?: number) => void;
    note?: FormData;
}) => {
    const [form, setForm] = useState<FormData>(initialForm);
    useEffect(() => {
        if (note) {
            setForm(note);
        }
    }, [note]);
    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        const { id, title, content } = form;
        onAddOrUpdate(title, content, id);
        setForm(initialForm);
    }
    return (
        <form onSubmit={handleSubmit} className="w-auto max-w-md mx-auto flex flex-col space-y-6">
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
            <div className="flex gap-2 justify-end">
                <button onClick={() => setForm(initialForm)} className="px-4 py-1 border border-gray-500 rounded">
                    Cancel
                </button>
                <button className="bg-blue-500 text-white rounded w-32 py-1" type="submit">
                    {form.id ? "Update" : "Add"}
                </button>
            </div>
        </form>
    );
};
export default NoteForm;
