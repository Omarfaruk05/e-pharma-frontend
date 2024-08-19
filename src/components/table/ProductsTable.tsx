"use client";

import { useState } from "react";
import { ImBin, ImPencil } from "react-icons/im";
import { toast } from "react-toastify";

import { IProduct } from "@/types";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from "@/redux/api/productApi";
import Link from "next/link";
import { getUserInfo } from "@/services/auth.service";
import ProcessingBtn from "../loading/ProcessingBtn";

const ProductsTable = ({ searchTerm }: { searchTerm: string }) => {
  const query: Record<string, any> = {};
  const [currentPage, setCurrentPage] = useState(1);
  if (searchTerm) query["searchTerm"] = searchTerm;
  const { role } = getUserInfo() as any;

  query["page"] = currentPage.toString();
  const { data, isLoading } = useGetProductsQuery({ ...query });
  const products: IProduct[] = data?.products;
  const meta = data?.meta;

  console.log(products);

  const [deleteProduct] = useDeleteProductMutation();

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < Math.ceil(meta?.total / meta?.limit)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      const res = await deleteProduct(id).unwrap();

      if (res?._id) {
        toast.success("Product deleted successfully.");
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <div className="w-fit">
          <ProcessingBtn />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border">
        <thead className="bg-blue-500 text-white">
          <tr>
            <th className="p-4 border-b">Name</th>
            <th className="p-4 border-b">Price</th>
            <th className="p-4 border-b">Discount</th>
            <th className="p-4 border-b">Stock Status</th>
            <th className="p-4 border-b">Categories</th>
            <th className="p-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products &&
            products.map((product: any) => (
              <tr key={product._id}>
                <td className="p-4 border-b ">{product.name}</td>
                <td className="p-4 border-b text-center">{product.price}</td>
                <td className="p-4 border-b text-center">
                  {product.discount}%
                </td>
                <td className="p-4 border-b text-center">
                  {product.stockStatus ? "In Stock" : "Out of Stock"}
                </td>
                <td className="p-4 border-b text-center">
                  {product.categories?.primary?.name}
                </td>

                <td className="p-4 border-b text-center">
                  <div className="flex gap-6 items-center justify-center">
                    <Link href={`/dashboard/${role}/products/${product?._id}`}>
                      <ImPencil
                        className="text-blue-400 cursor-pointer"
                        size={28}
                      />
                    </Link>
                    <ImBin
                      onClick={() => handleDeleteProduct(product?._id)}
                      className="text-red-500 cursor-pointer"
                      size={28}
                    />
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-4">
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
          Page {currentPage} of {Math.ceil(meta?.total / meta?.limit)}
        </span>
        <button
          onClick={handleNext}
          className={`px-4 py-2 bg-sky-400 text-white rounded ${
            currentPage === Math.ceil(meta?.total / meta?.limit) &&
            "cursor-not-allowed opacity-50"
          }`}
          disabled={currentPage === Math.ceil(meta?.total / meta?.limit)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductsTable;
