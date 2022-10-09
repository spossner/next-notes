import { Note } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Note[]>
) {
  try {
    const { id } = req.query;
    if (!id) {
      throw new Error(`missing id in ${req.url}`);
    }

    if (req.method === "DELETE") {
      const note = await prisma.note.delete({
        where: {
          id: +id,
        },
      });
      res.status(200).send([note]);
    } else {
      const note = await prisma.note.findUnique({
        where: {
          id: +id,
        },
      });
      if (!note) {
        res.status(404).json([]);
      } else {
        res.status(200).json([note]);
      }
    }
  } catch (e) {
    console.log(e);
    res.status(500).send([]);
  }
}
