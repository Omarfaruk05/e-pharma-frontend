"use client";

import { useGetProductsQuery } from "@/redux/api/productApi";
import { IMeta, IProduct } from "@/types";
import ProductCart from "./ProductCart";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const Products = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const searchParams = useSearchParams();
  const primaryId = searchParams.get("primaryId");
  const searchTerm = searchParams.get("searchTerm");

  // Construct the query object
  const query: Record<string, any> = {};
  if (primaryId) query["primaryId"] = primaryId;
  if (searchTerm) query["searchTerm"] = searchTerm;
  query["page"] = currentPage.toString();

  const { data, isLoading } = useGetProductsQuery(query);
  const products: IProduct[] | undefined = data?.products;
  const meta = data?.meta;

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < Math.ceil(meta.total / meta.limit)) {
      setCurrentPage(currentPage + 1);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!products || products.length === 0) {
    return <p>No products found.</p>;
  }

  return (
    <div>
      <div className="  grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-4">
        {products.map((product: IProduct, index: number) => (
          <ProductCart product={product} key={product._id || index} />
        ))}
      </div>
      {/* pagination  */}
      <div className="flex justify-center gap-3 items-center mt-4">
        <button
          onClick={handlePrevious}
          className={`px-4 py-2 bg-sky-400 text-white rounded ${
            currentPage === 1 && "cursor-not-allowed opacity-50"
          }`}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {Math.ceil(meta.total / meta.limit)}
        </span>
        <button
          onClick={handleNext}
          className={`px-4 py-2 bg-sky-400 text-white rounded ${
            currentPage === Math.ceil(meta.total / meta.limit) &&
            "cursor-not-allowed opacity-50"
          }`}
          disabled={currentPage === Math.ceil(meta.total / meta.limit)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Products;
