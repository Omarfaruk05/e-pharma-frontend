import UsersTable from "@/components/table/UsersTable";
import React from "react";

const AllAdminsPage = () => {
  return (
    <div className="p-4">
      <UsersTable role="admin" />
    </div>
  );
};

export default AllAdminsPage;
