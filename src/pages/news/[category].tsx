import { GetServerSideProps, GetServerSidePropsContext } from "next";
import React from "react";

interface INew {
  id: number;
  title: string;
  description: string;
  category: string;
}

function FilterByCategory({ news }: { news: INew[] }) {
  return (
    <div>
      {news.map((newItem) => {
        return (
          <React.Fragment key={newItem.id}>
            <p>
              {newItem.id} - {newItem.title}
            </p>
            <p>{newItem.category}</p>
            <p>{newItem.description}</p>
          </React.Fragment>
        );
      })}
    </div>
  );
}

export default FilterByCategory;

export const getServerSideProps: GetServerSideProps<{ news: INew[] }> = async (
  context: GetServerSidePropsContext
) => {
  const { params, req, res, query } = context;
  const response = await fetch(
    `http://localhost:4000/news?category=${params?.category}`,
    {
      method: "GET",
    }
  );
  const news: INew[] = await response.json();
  if (news.length <= 0) return { notFound: true };
  return {
    props: { news },
  };
};
