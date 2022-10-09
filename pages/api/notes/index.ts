// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Note } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Note[]>
) {
  try {
    if (req.method === "POST") {
      const { title, content } = req.body;
      const newNote = await prisma.note.create({
        data: {
          title,
          content,
        },
      });
      res.status(200).send([newNote]);
    } else {
      console.log(req.method);

      const notes = await prisma.note.findMany();
      res.status(200).json(notes);
    }
  } catch (e) {
    console.log(e);
    res.status(500).send([]);
  }
}
