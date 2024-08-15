"use client";

import ProductsTable from "@/components/table/ProductsTable";
import { getUserInfo } from "@/services/auth.service";
import Link from "next/link";
import React from "react";

const ProductsPage = () => {
  const { role } = getUserInfo() as any;
  const handleSearch = (event: any) => {
    event.preventDefault();
  };
  return (
    <div className="m-4">
      <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-3 my-4">
        <form
          className="flex justify-center items-center"
          onSubmit={handleSearch}
        >
          <input
            type="text"
            name="searchTerm"
            id="searchTerm"
            placeholder="Search here"
            className="m-1 border border-gray-200 p-2 text-gray-800 focus:outline-gray-200 rounded-md w-full"
          />
          <input
            className="bg-sky-500 text-white p-2 rounded-lg"
            type="submit"
            value={"Search"}
          />
        </form>
        <div>
          <Link
            className="cursor-pointer bg-slate-700 p-3 rounded-md text-white"
            href={`/dashboard/${role}/products/create`}
          >
            Create Product
          </Link>
        </div>
      </div>
      <ProductsTable />
    </div>
  );
};

export default ProductsPage;
