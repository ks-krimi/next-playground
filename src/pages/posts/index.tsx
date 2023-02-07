import Link from "next/link";

interface IPost {
  id: number;
  title: string;
  body: string;
}

function Posts(props: { posts: IPost[] }) {
  return (
    <div>
      {props.posts.map((post) => {
        return (
          <p key={post.id}>
            <Link href={`/posts/${post.id}`}>{post.id}</Link> - {post.title}
          </p>
        );
      })}
    </div>
  );
}

export default Posts;

export async function getStaticProps() {
  let posts: IPost[] = [];
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "GET",
    });
    posts = await res.json();
  } catch (error) {
    console.log(error);
  } finally {
    return {
      props: {
        posts: posts.slice(0, 3),
      },
    };
  }
}
