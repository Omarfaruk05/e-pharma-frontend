"use client";

import ProcessingBtn from "@/components/loading/ProcessingBtn";
import MyInfo from "@/components/ui/MyInfo";
import { useGetSingleUserQuery } from "@/redux/api/userApi";
import { getUserInfo } from "@/services/auth.service";
import React from "react";

const SuperAdminPage = () => {
  const { _id } = getUserInfo() as any;
  const { data, isLoading } = useGetSingleUserQuery(_id);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-screen">
        <div className="w-fit">
          <ProcessingBtn />
        </div>
      </div>
    );
  }
  return (
    <div className="w-fit md:w-full">
      <MyInfo data={data} />
    </div>
  );
};

export default SuperAdminPage;
