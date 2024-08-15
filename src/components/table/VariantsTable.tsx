"use client";

import {
  useDeleteVariantMutation,
  useGetVariantsQuery,
} from "@/redux/api/variantApi";
import { IMeta, IVariant } from "@/types";
import { useState } from "react";
import { ImBin, ImPencil } from "react-icons/im";
import { toast } from "react-toastify";

const VariantsTable = () => {
  const query: Record<string, any> = {};
  const [currentPage, setCurrentPage] = useState(1);

  query["page"] = currentPage.toString();
  const { data, isLoading } = useGetVariantsQuery({ ...query });
  const variants: IVariant[] = data?.variants;
  const meta = data?.meta;

  const [deleteVariant] = useDeleteVariantMutation();

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
  const handleDeleteVariant = async (id: string) => {
    try {
      const res = await deleteVariant(id).unwrap();

      if (res?._id) {
        toast.success("Variant deleted successfully.");
      }
    } catch (error: any) {
      toast.error(error);
    }
  };

  if (isLoading) {
    return <p>Loading... </p>;
  }

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border">
        <thead className="bg-blue-500 text-white">
          <tr>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Variant</th>
            <th className="py-2 px-4 border-b">Price</th>
            <th className="py-2 px-4 border-b">Quanitiy</th>
            <th className="py-2 px-4 border-b">Created At</th>
            <th className="py-2 px-4 border-b">Updated At</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {variants &&
            variants?.map((variant: any) => (
              <tr key={variant._id}>
                <td className="py-2 px-4 border-b">{variant.productName}</td>
                <td className="py-2 px-4 border-b">{variant.variant}</td>
                <td className="py-2 px-4 border-b">{variant.price}</td>
                <td className="py-2 px-4 border-b">{variant.quantity}</td>

                <td className="py-2 px-4 border-b">
                  {new Date(variant.createdAt).toLocaleDateString()}
                </td>
                <td className="py-2 px-4 border-b">
                  {new Date(variant.updatedAt).toLocaleDateString()}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  <div className="flex gap-6 items-center justify-center">
                    <ImPencil
                      className="text-blue-400 cursor-pointer"
                      size={28}
                    />
                    <ImBin
                      onClick={() => handleDeleteVariant(variant?._id)}
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

export default VariantsTable;
