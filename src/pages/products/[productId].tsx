import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { useRouter } from "next/router";

interface IProduct {
  id: number;
  title: string;
  price: number;
  description: string;
}

function Product({ product }: { product: IProduct }) {
  const router = useRouter();
  if (router.isFallback) return <p>Loading...</p>;
  return (
    <div>
      <p>{product.id}</p>
      <p>{product.title}</p>
      <p>{product.price}</p>
      <p>{product.description}</p>
    </div>
  );
}

export default Product;

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch("http://localhost:4000/products");
  const products: IProduct[] = await res.json();
  const paths = products.map((product) => {
    return { params: { productId: `${product.id}` } };
  });
  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps<{
  product: IProduct;
}> = async (context: GetStaticPropsContext) => {
  const { params } = context;
  const res = await fetch(
    `http://localhost:4000/products/${params?.productId}`
  );
  const product: IProduct = await res.json();
  if (!product.id) return { notFound: true };
  return {
    props: { product },
    revalidate: 10,
  };
};
