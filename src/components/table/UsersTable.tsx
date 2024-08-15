"use client";

import { useDeleteUserMutation } from "@/redux/api/userApi";
import { ImBin } from "react-icons/im";
import { toast } from "react-toastify";

const UsersTable = ({ users }: any) => {
  const [deleteUser] = useDeleteUserMutation();

  const handleDeleteUser = async (id: string) => {
    try {
      const res = await deleteUser(id).unwrap();

      if (res?._id) {
        toast.success("User deleted successfully.");
      }
    } catch (error: any) {
      toast.error(error);
    }
  };
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border">
        <thead className="bg-sky-500 text-white">
          <tr>
            <th className="p-4 border-b">Name</th>
            <th className="p-4 border-b">Email</th>
            <th className="p-4 border-b">Role</th>
            <th className="p-4 border-b">Email Verified</th>
            <th className="p-4 border-b">Created At</th>
            <th className="p-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user: any) => (
              <tr key={user._id}>
                <td className="py-2 px-4 border-b">{user.name}</td>
                <td className="py-2 px-4 border-b text-center">{user.email}</td>
                <td className="py-2 px-4 border-b text-center">{user.role}</td>
                <td className="py-2 px-4 border-b text-center">
                  {user.isEmailVerified ? "Yes" : "No"}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="py-2 px-4 border-b">
                  <ImBin
                    onClick={() => handleDeleteUser(user?._id)}
                    className="mx-auto text-red-600 cursor-pointer"
                    size={28}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
