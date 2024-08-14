"use client";

import { useGetProductsQuery } from "@/redux/api/productApi";
import { IProduct } from "@/types";
import ProductCart from "./ProductCart";
import { useSearchParams } from "next/navigation";

const Products = () => {
  const query: Record<string, any> = {};
  const searchParams = useSearchParams();
  const primaryId = searchParams.get("primaryId");
  const searchTerm = searchParams.get("searchTerm");

  query["primaryId"] = primaryId;
  query["searchTerm"] = searchTerm;
  const { data, isLoading } = useGetProductsQuery({ ...query });
  const products: IProduct[] = data?.products;

  console.log(primaryId);
  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  2xl:grid-cols-6 gap-4">
        {products &&
          products?.map((product: any, index: number) => (
            <ProductCart product={product} key={index} />
          ))}
      </div>
    </div>
  );
};

export default Products;
