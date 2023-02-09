import { GetStaticProps } from "next";
import Link from "next/link";

interface IProduct {
  id: number;
  title: string;
  price: number;
  description: string;
}

function Products({ products }: { products: IProduct[] }) {
  return (
    <div>
      {products.map((product) => (
        <>
          <Link href={`/products/${product.id}`}>
            <p>
              {product.id} - {product.title}
            </p>
          </Link>
          <p>{product.price}</p>
        </>
      ))}
    </div>
  );
}

export default Products;

export const getStaticProps: GetStaticProps<{
  products: IProduct[];
}> = async () => {
  const res = await fetch("http://localhost:4000/products");
  const products: IProduct[] = await res.json();
  return {
    props: {
      products,
    },
  };
};
