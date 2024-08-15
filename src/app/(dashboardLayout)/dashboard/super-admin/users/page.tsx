import UsersTable from "@/components/table/UsersTable";
import React from "react";

const AllUsers = () => {
  return (
    <div className="p-4">
      <UsersTable role="user" />
    </div>
  );
};

export default AllUsers;
