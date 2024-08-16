"use client";

import { useState } from "react";
import { ImBin, ImPencil } from "react-icons/im";
import { toast } from "react-toastify";
import { useGetUsersQuery, useDeleteUserMutation } from "@/redux/api/userApi";
import { IUser, IMeta } from "@/types";
import ProcessingBtn from "../loading/ProcessingBtn";

const UsersTable = ({
  role,
  searchTerm,
}: {
  role: string;
  searchTerm: string;
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const query: Record<string, any> = {};

  if (searchTerm) query["searchTerm"] = searchTerm;
  query["page"] = currentPage.toString();
  query["role"] = role;
  const { data, isLoading } = useGetUsersQuery({ ...query });
  const users: IUser[] = data?.users;
  const meta: IMeta = data?.meta;

  const [deleteUser] = useDeleteUserMutation();

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

  const handleDeleteUser = async (id: string) => {
    try {
      const res = await deleteUser(id).unwrap();
      if (res?._id) {
        toast.success("User deleted successfully.");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to delete user.");
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
            <th className="p-4 border-b">Email</th>
            <th className="p-4 border-b">Role</th>
            <th className="p-4 border-b">Email Verified</th>
            <th className="p-4 border-b">Created At</th>
            <th className="p-4 border-b">Updated At</th>
            <th className="p-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user: IUser) => (
            <tr key={user._id}>
              <td className="p-4 border-b">{user.name}</td>
              <td className="p-4 border-b text-center">{user.email}</td>
              <td className="p-4 border-b text-center">{user.role}</td>
              <td className="p-4 border-b text-center">
                {user.isEmailVerified ? "Yes" : "No"}
              </td>
              <td className="p-4 border-b text-center">
                {new Date(user.createdAt).toLocaleDateString()}
              </td>
              <td className="p-4 border-b text-center">
                {new Date(user.updatedAt).toLocaleDateString()}
              </td>
              <td className="p-4 border-b text-center">
                <div className="flex gap-6 items-center justify-center">
                  <ImBin
                    onClick={() => handleDeleteUser(user._id)}
                    className="text-red-500 cursor-pointer"
                    size={20}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* pagination  */}
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

export default UsersTable;
