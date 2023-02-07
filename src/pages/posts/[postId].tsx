import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";

interface IPost {
  id: number;
  title: string;
  body: string;
}

function Post(props: { post: IPost }) {
  return (
    <div>
      <p>{props.post.id}</p>
      <p>{props.post.title}</p>
      <p>{props.post.body}</p>
    </div>
  );
}

export default Post;

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [
      { params: { postId: "1" } },
      { params: { postId: "2" } },
      { params: { postId: "3" } },
    ],
    fallback: false,
  };
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
  return {
    props: { post },
  };
};
