import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Link from "next/link";
import React from "react";

interface INews {
  id: number;
  title: string;
  description: string;
  category: string;
}

function News({ news }: { news: INews[] }) {
  return (
    <div>
      {news.map((newItem) => {
        return (
          <React.Fragment key={newItem.id}>
            <Link href={`/news/${newItem.id}`}>
              {newItem.id} - {newItem.title}
            </Link>
            <p>{newItem.category}</p>
          </React.Fragment>
        );
      })}
    </div>
  );
}

export default News;

export const getServerSideProps: GetServerSideProps<{ news: INews[] }> = async (
  context: GetServerSidePropsContext
) => {
  const res = await fetch("http://localhost:4000/news", {
    method: "GET",
  });
  const news: INews[] = await res.json();
  return {
    props: { news },
  };
};
