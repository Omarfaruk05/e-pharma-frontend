"use client";

import UsersTable from "@/components/table/UsersTable";
import React, { useState } from "react";

const AllAdminsPage = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearch = (event: any) => {
    event.preventDefault();
    setSearchTerm(event.target.searchTerm.value);
  };
  return (
    <div className="p-4">
      <UsersTable role="admin" searchTerm={searchTerm} />
    </div>
  );
};

export default AllAdminsPage;
