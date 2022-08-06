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
  } catch (e) {
    res.status(400).json({ error: "Invalid Request" });
  }
}
