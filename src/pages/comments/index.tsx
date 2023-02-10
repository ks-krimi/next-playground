import { useState } from "react";

interface IComments {
  id: number;
  text: string;
}

function Comments() {
  const [comments, setComments] = useState<IComments[]>([]);
  const handleclick = async () => {
    const response = await fetch("http://localhost:3000/api/comments");
    const comments: IComments[] = await response.json();
    setComments(comments);
  };

  return (
    <div>
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
