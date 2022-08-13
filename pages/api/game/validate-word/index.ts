// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import wordGameLib from "../../../../lib/game";

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
  try {
    const { inputWord, baseWord } = req.body;
    const result = (await wordGameLib).validateWord(inputWord, baseWord);
    res.status(200).json({ result });
  } catch (error) {
    const e = error as Error;
    if (e.message === "Word not found") {
      res.status(404).json({ error: "Word not found" });
    } else if (e.message === "Word too large") {
      res.status(400).json({ error: "Word too large" });
    } else if (e.message === "Word too short") {
      res.status(400).json({ error: "Word too short" });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}
