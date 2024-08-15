"use client";

import MyInfo from "@/components/ui/MyInfo";
import { useGetSingleUserQuery } from "@/redux/api/userApi";
import { getUserInfo } from "@/services/auth.service";
import React from "react";

const SuperAdminPage = () => {
  const { _id } = getUserInfo() as any;
  const { data, isLoading } = useGetSingleUserQuery(_id);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <div className="w-fit md:w-full">
      <MyInfo data={data} />
    </div>
  );
};

export default SuperAdminPage;
