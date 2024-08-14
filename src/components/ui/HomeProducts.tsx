"use client";
import Link from "next/link";
import React from "react";
import ProductCart from "./ProductCart";
import { useGetProductsQuery } from "@/redux/api/productApi";

const HomeProducts = ({
  category,
  path,
}: {
  category: string;
  path: string;
}) => {
  const query: Record<string, any> = {};

  query["primaryId"] = path;
  const { data, isLoading } = useGetProductsQuery({ ...query });
  const products = data?.products;

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div className="space-y-3">
        <div className="font-semibold flex justify-between items-center">
          <h4 className="text-2xl">{category}</h4>
          <Link
            className="text-blue-400 underline"
            href={`/product?primaryId=${path}`}
          >
            See All
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  2xl:grid-cols-6 gap-4">
          {products &&
            products?.map((product: any, index: number) => (
              <ProductCart product={product} key={index} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default HomeProducts;
