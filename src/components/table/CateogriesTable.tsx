"use client";

import {
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
} from "@/redux/api/categoryApi";
import { getUserInfo } from "@/services/auth.service";
import { ICategory, IMeta } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ImBin, ImPencil } from "react-icons/im";
import { toast } from "react-toastify";
import ProcessingBtn from "../loading/ProcessingBtn";

const CategoriesTable = ({ searchTerm }: { searchTerm: string }) => {
  const query: Record<string, any> = {};
  const [currentPage, setCurrentPage] = useState(1);
  const { role } = getUserInfo() as any;

  if (searchTerm) query["searchTerm"] = searchTerm;
  query["page"] = currentPage.toString();

  const { data, isLoading } = useGetCategoriesQuery({ ...query });
  const categories: ICategory[] = data?.categories;
  const meta: IMeta = data?.meta;

  const [deleteCategory] = useDeleteCategoryMutation();

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

  const handleDeleteCategory = async (id: string) => {
    try {
      const res = await deleteCategory(id).unwrap();

      if (res?._id) {
        toast.success("Category deleted successfully.");
      }
    } catch (error: any) {
      toast.error(error);
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
            <th className="p-4 border-b">Thumbnail</th>
            <th className="p-4 border-b">Created At</th>
            <th className="p-4 border-b">Updated At</th>
            <th className="p-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories &&
            categories.map((category: any) => (
              <tr key={category._id}>
                <td className="py-2 px-4 border-b">{category.name}</td>
                <td className="py-2 px-4 border-b">
                  <Image
                    width={40}
                    height={50}
                    src={category.thumbnail}
                    alt={category.name}
                    className="h-10 w-10 object-cover mx-auto rounded-lg"
                  />
                </td>
                <td className="py-2 px-4 border-b">
                  {new Date(category.createdAt).toLocaleDateString()}
                </td>
                <td className="py-2 px-4 border-b">
                  {new Date(category.updatedAt).toLocaleDateString()}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  <div className="flex gap-6 items-center justify-center">
                    <Link
                      href={`/dashboard/${role}/categories/${category?._id}`}
                    >
                      <ImPencil
                        className="text-blue-400 cursor-pointer"
                        size={28}
                      />
                    </Link>
                    <ImBin
                      onClick={() => handleDeleteCategory(category?._id)}
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

export default CategoriesTable;
