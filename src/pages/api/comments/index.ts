import { comments } from "@/mocks/comments";
import { NextApiRequest, NextApiResponse } from "next";

type Comments = {
  id: number;
  text: string;
};

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<Comments[]>
) {
  res.status(200).json(comments);
}
