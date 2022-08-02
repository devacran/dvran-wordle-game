// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { validateWord } from "../../../../lib/game";

type Data =
  | {
      result: number[];
    }
  | {
      error: string;
    };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "GET") {
    res.status(200).json({ data: "Hola" });
  } else {
    res.status(400).json({ error: "Method not allowed" });
  }
}
