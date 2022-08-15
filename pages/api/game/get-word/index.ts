// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import WordGameLib, { wordsFromApi } from "../../../../lib/game/gameLib";

type Data =
  | {
      data: string;
    }
  | {
      error: string;
    };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "GET") {
    const level: number = parseInt(req.query.level as string);

    try {
      const word = await WordGameLib(wordsFromApi).getWord(level);
      res.status(200).json({ data: word });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(400).json({ error: "Method not allowed" });
  }
}
