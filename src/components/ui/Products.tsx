"use client";

import { useGetProductsQuery } from "@/redux/api/productApi";
import { IProduct } from "@/types";
import ProductCart from "./ProductCart";
import { useSearchParams } from "next/navigation";

const Products = () => {
  const searchParams = useSearchParams();
  const primaryId = searchParams.get("primaryId");
  const searchTerm = searchParams.get("searchTerm");

  // Construct the query object
  const query: Record<string, any> = {};
  if (primaryId) query["primaryId"] = primaryId;
  if (searchTerm) query["searchTerm"] = searchTerm;

  const { data, isLoading } = useGetProductsQuery(query);
  const products: IProduct[] | undefined = data?.products;

  console.log("Primary ID:", primaryId);
  console.log("Search Term:", searchTerm);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!products || products.length === 0) {
    return <p>No products found.</p>;
  }

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-4">
        {products.map((product: IProduct, index: number) => (
          <ProductCart product={product} key={product._id || index} />
        ))}
      </div>
    </div>
  );
};

export default Products;
