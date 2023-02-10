import React, { useState } from "react";

interface IComment {
  id: number;
  text: string;
}

function Comments() {
  const [comments, setComments] = useState<IComment[]>([]);
  const [comment, setComment] = useState<string>("");

  const handleclick = async (): Promise<void> => {
    const response = await fetch("http://localhost:3000/api/comments");
    const comments: IComment[] = await response.json();
    setComments(comments);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setComment(e.target.value);
  };

  const addComment = async (): Promise<void> => {
    await fetch("http://localhost:3000/api/comments", {
      method: "POST",
      body: JSON.stringify({ text: comment }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <div>
      <input type="text" value={comment} onChange={handleChange} />
      <button onClick={addComment}>POST: Comment</button>
      <button onClick={handleclick}>GET: Comments</button>
      {comments.map((comment) => {
        return (
          <div key={comment.id}>
            {comment.id} - {comment.text}
          </div>
        );
      })}
    </div>
  );
}

export default Comments;
