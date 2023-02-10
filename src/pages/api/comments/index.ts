import { comments } from "@/mocks/comments";
import { NextApiRequest, NextApiResponse } from "next";

type Comment = {
  id: number;
  text: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Comment[] | Comment>
) {
  if (req.method === "GET") {
    res.status(200).json(comments);
  } else if (req.method === "POST") {
    const newComment: Comment = {
      id: Date.now(),
      text: req.body.text,
    };
    comments.push(newComment);
    res.status(201).json(newComment);
  }
}
