import { Note } from "@prisma/client";
import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import NoteForm from "../components/notes/note-form";
import NotesList from "../components/notes/note-list";
import { prisma } from "../lib/prisma";

const Home: NextPage<{ notes: Note[] }> = ({ notes }) => {
    const router = useRouter();
    const [selectedNote, setSelectedNote] = useState<Note | undefined>();
    const reloadData = () => {
        router.replace(router.asPath); // ugly -> jumps to top of page.. feels weird
    };

    const onAddOrUpdate = useCallback(async (title: string, content: string, id?: number) => {
        fetch(id ? `/api/notes/${id}` : "/api/notes", {
            method: id ? "PUT" : "POST",
            body: JSON.stringify({ title, content }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        }).then(() => {
            reloadData();
        });
    }, []);

    const removeNote = useCallback(async (id: number) => {
        fetch(`/api/notes/${id}`, {
            method: "DELETE",
        }).then(() => {
            reloadData();
        });
    }, []);

    const editNote = useCallback((id: number) => {
        const noteById = notes.find((note) => note.id === id);

        setSelectedNote(noteById);
    }, []);

    return (
        <div className="container mx-auto max-w-md p-4">
            <h1 className="text-2xl font-bold" onClick={reloadData}>
                Notes
            </h1>
            <NoteForm onAddOrUpdate={onAddOrUpdate} note={selectedNote} />
            <NotesList notes={notes} onRemove={removeNote} onEdit={editNote} />
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async () => {
    const notes = await prisma?.note.findMany();
    return {
        props: {
            notes,
        },
    };
};

export default Home;
