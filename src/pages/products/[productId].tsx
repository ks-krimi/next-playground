import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";

interface IProduct {
  id: number;
  title: string;
  price: number;
  description: string;
}

function Product({ product }: { product: IProduct }) {
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
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<{
  product: IProduct;
}> = async (context: GetStaticPropsContext) => {
  const { params } = context;
  const res = await fetch(
    `http://localhost:4000/products/${params?.productId}`
  );
  const product: IProduct = await res.json();
  return {
    props: {
      product,
    },
  };
};
