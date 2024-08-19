"use client";

import { useState } from "react";
import { ImBin, ImPencil } from "react-icons/im";
import { toast } from "react-toastify";
import {
  useGetShippingAddressesQuery,
  useDeleteShippingAddressMutation,
} from "@/redux/api/shippingAddressApi";
import { IMeta, IShippingAddress } from "@/types";
import ProcessingBtn from "../loading/ProcessingBtn";

const ShippingAddressesTable = ({ searchTerm }: { searchTerm: string }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const query: Record<string, any> = {};

  if (searchTerm) query["searchTerm"] = searchTerm;
  query["page"] = currentPage.toString();
  const { data, isLoading } = useGetShippingAddressesQuery({ ...query });
  const shippingAddresses: IShippingAddress[] = data?.shippingAddresses;
  const meta: IMeta = data?.meta;

  const [deleteShippingAddress] = useDeleteShippingAddressMutation();

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

  const handleDeleteShippingAddress = async (id: string) => {
    try {
      const res = await deleteShippingAddress(id).unwrap();
      if (res?._id) {
        toast.success("Shipping address deleted successfully.");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to delete shipping address.");
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
            <th className="p-4 border-b">Phone</th>
            <th className="p-4 border-b">Division</th>
            <th className="p-4 border-b">District</th>
            <th className="p-4 border-b">Sub-District</th>
            <th className="p-4 border-b">Address</th>
            <th className="p-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {shippingAddresses?.map((address: IShippingAddress) => (
            <tr key={address._id}>
              <td className="p-4 border-b">{address.name}</td>
              <td className="p-4 border-b text-center">{address.phone}</td>
              <td className="p-4 border-b text-center">{address.division}</td>
              <td className="p-4 border-b text-center">{address.district}</td>
              <td className="p-4 border-b text-center">
                {address.subDistrict}
              </td>
              <td className="p-4 border-b text-center">{address.address}</td>

              <td className="p-4 border-b text-center">
                <div className="flex gap-6 items-center justify-center">
                  <ImBin
                    onClick={() => handleDeleteShippingAddress(address._id)}
                    className="text-red-500 cursor-pointer"
                    size={20}
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

export default ShippingAddressesTable;
