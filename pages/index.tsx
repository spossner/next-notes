import { Note } from "@prisma/client";
import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import NoteForm from "../components/notes/note-form";
import NotesList from "../components/notes/note-list";
import { prisma } from "../lib/prisma";

const Home: NextPage<{ notes: Note[] }> = ({ notes }) => {
  const router = useRouter();
  const reloadData = () => {
    router.replace(router.asPath);
  };
  async function addNote(title: string, content: string) {
    fetch("/api/notes", {
      method: "POST",
      body: JSON.stringify({ title, content }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then(() => {
      reloadData();
    });
  }

  async function removeNote(id: number) {
    fetch(`/api/notes/${id}`, {
      method: "DELETE",
    }).then(() => {
      reloadData();
    });
  }

  return (
    <div className="container mx-auto max-w-4xl p-4">
      <h1 className="text-2xl font-bold" onClick={reloadData}>
        Notes
      </h1>
      <NoteForm onAdd={addNote} />
      <NotesList notes={notes} onRemove={removeNote} />
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
