"use client";

import UsersTable from "@/components/table/UsersTable";
import { useGetUsersQuery } from "@/redux/api/userApi";
import { IMeta, IUser } from "@/types";
import React from "react";

const AllUsers = () => {
  const query: Record<string, any> = {};
  const { data, isLoading } = useGetUsersQuery({ ...query });
  const users: IUser[] = data?.users;
  const meta: IMeta = data?.meta;

  return (
    <div className="p-4">
      <UsersTable users={users} />
    </div>
  );
};

export default AllUsers;
