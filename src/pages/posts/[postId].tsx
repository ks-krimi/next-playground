import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { useRouter } from "next/router";

interface IPost {
  id: number;
  title: string;
  body: string;
}

function Post(props: { post: IPost }) {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <p>{props.post.id}</p>
      <p>{props.post.title}</p>
      <p>{props.post.body}</p>
    </div>
  );
}

export default Post;

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "GET",
  });
  const posts: IPost[] = await res.json();
  const paths = posts.slice(0, 3).map((post) => {
    return {
      params: { postId: `${post.id}` },
    };
  });
  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps<{ post: IPost }> = async (
  context: GetStaticPropsContext
) => {
  const { params } = context;
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params?.postId}`,
    {
      method: "GET",
    }
  );
  const post: IPost = await res.json();
  if (!post.id) return { notFound: true }; // 404
  return {
    props: { post },
  };
};
