import UsersTable from "@/components/table/UsersTable";
import { useGetUsersQuery } from "@/redux/api/userApi";
import { getUserInfo } from "@/services/auth.service";
import { IMeta, IUser } from "@/types";
import React from "react";

const AllUsers = () => {
  return (
    <div className="p-4">
      <UsersTable />
    </div>
  );
};

export default AllUsers;
