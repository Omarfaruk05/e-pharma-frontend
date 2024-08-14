"use client";

import MainContainer from "@/components/layout/MainContainer";
import { useGetSingleUserQuery } from "@/redux/api/userApi";
import { getUserInfo } from "@/services/auth.service";
import { IUser } from "@/types";
import Image from "next/image";
import React from "react";

const MyProfile = () => {
  const { _id } = getUserInfo() as any;
  const { data, isLoading } = useGetSingleUserQuery(_id);
  console.log(data);
  return (
    <div className="flex justify-center m-40 items-center">
      <div className="space-y-4 p-12 shadow-md rounded-lg bg-sky-50">
        <div className="h-40 w-40 rounded-full bg-gray-300 p-2 mx-auto">
          <Image className="" src={data?.photo} alt="profile_image" />
        </div>
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold">{data?.name}</h2>
          <h4 className="text-xl font-semibold text-gray-600">{data?.email}</h4>
          <p className="font-semibold">
            Role: <span className="text-sky-500 uppercase">{data?.role}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
