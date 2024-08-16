"use client";

import { useGetCategoriesQuery } from "@/redux/api/categoryApi";
import { useGetOrdersQuery } from "@/redux/api/orderApi";
import { useGetProductsQuery } from "@/redux/api/productApi";
import { useGetShippingAddressesQuery } from "@/redux/api/shippingAddressApi";
import { useGetUsersQuery } from "@/redux/api/userApi";
import { useGetVariantsQuery } from "@/redux/api/variantApi";
import { IUser } from "@/types";
import Image from "next/image";
import React from "react";
import { PiFlagPennantFill, PiFlagPennantLight } from "react-icons/pi";
import ProcessingBtn from "../loading/ProcessingBtn";

const MyInfo = ({ data }: { data: IUser }) => {
  const { data: userData, isLoading: userLoading } = useGetUsersQuery({
    role: "user",
  });
  const { data: orderData, isLoading: orderLoading } = useGetOrdersQuery({});
  const { data: categoryData, isLoading: categoryLoading } =
    useGetCategoriesQuery({});
  const { data: shippingData, isLoading: shippingLoading } =
    useGetShippingAddressesQuery({});
  const { data: productData, isLoading: productLoading } = useGetProductsQuery(
    {}
  );
  const { data: variantData, isLoading: variantLoading } = useGetVariantsQuery(
    {}
  );

  const variants = variantData?.meta;
  const products = productData?.meta;
  const categories = categoryData?.meta;
  const shippingAddresses = shippingData?.meta;
  const orders = orderData?.meta;
  const users = userData?.meta;

  if (
    userLoading ||
    variantLoading ||
    productLoading ||
    categoryLoading ||
    shippingLoading ||
    orderLoading
  ) {
    return (
      <div className="flex justify-center items-center w-screen">
        <div className="w-fit">
          <ProcessingBtn />
        </div>
      </div>
    );
  }

  return (
    <div>
      {data?.role === "user" ? (
        <div className="flex justify-center items-center mt-40">
          <div className="space-y-4 p-12 shadow-md rounded-lg bg-sky-50">
            <div className="h-40 w-40 rounded-full bg-gray-300 p-2 mx-auto">
              <Image className="" src={data?.photo} alt="profile_image" />
            </div>
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold">{data?.name}</h2>
              <h4 className="text-xl font-semibold text-gray-600">
                {data?.email}
              </h4>
              <p className="font-semibold">
                Role:{" "}
                <span className="text-sky-500 uppercase">{data?.role}</span>
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="m-4">
          <div className="flex flex-wrap justify-around gap-3">
            <div className="bg-lime-100 w-48 md:w-60 p-4 space-y-3 rounded-lg shadow-md">
              <div className="flex justify-start items-center">
                <h3 className="text-5xl font-bold">{users?.total}</h3>
                <PiFlagPennantFill className="text-sky-500" size={40} />
              </div>
              <p className="text-xl font-semibold">Total User</p>
            </div>
            <div className="bg-red-100 w-48 md:w-60 p-4 space-y-3 rounded-lg shadow-md">
              <div className="flex justify-start items-center">
                <h3 className="text-5xl font-bold">{products?.total}</h3>
                <PiFlagPennantFill className="text-sky-500" size={40} />
              </div>
              <p className="text-xl font-semibold">Total Products</p>
            </div>
            <div className="bg-orange-100 w-48 md:w-60 p-4 space-y-3 rounded-lg shadow-md">
              <div className="flex justify-start items-center">
                <h3 className="text-5xl font-bold">{categories?.total}</h3>
                <PiFlagPennantFill className="text-sky-500" size={40} />
              </div>
              <p className="text-xl font-semibold">Total Categories</p>
            </div>
            <div className="bg-cyan-200 w-48 md:w-60 p-4 space-y-3 rounded-lg shadow-md">
              <div className="flex justify-start items-center">
                <h3 className="text-5xl font-bold">{variants?.total}</h3>
                <PiFlagPennantFill className="text-sky-500" size={40} />
              </div>
              <p className="text-xl font-semibold">Total Variants</p>
            </div>
            <div className="bg-blue-200 w-48 md:w-60 p-4 space-y-3 rounded-lg shadow-md">
              <div className="flex justify-start items-center">
                <h3 className="text-5xl font-bold">
                  {shippingAddresses?.total}
                </h3>
                <PiFlagPennantFill className="text-sky-500" size={40} />
              </div>
              <p className="text-xl font-semibold">Total Shipping</p>
            </div>
            <div className="bg-purple-300 w-48 md:w-60 p-4 space-y-3 rounded-lg shadow-md">
              <div className="flex justify-start items-center">
                <h3 className="text-5xl font-bold">{orders?.total}</h3>
                <PiFlagPennantFill className="text-sky-500" size={40} />
              </div>
              <p className="text-xl font-semibold">Total Orders</p>
            </div>
          </div>
          <div className="flex justify-center items-center mt-40">
            <div className="space-y-4 p-12 shadow-md rounded-lg bg-sky-50">
              <div className="h-40 w-40 rounded-full bg-gray-300 p-2 mx-auto">
                <Image className="" src={data?.photo} alt="profile_image" />
              </div>
              <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold">{data?.name}</h2>
                <h4 className="text-xl font-semibold text-gray-600">
                  {data?.email}
                </h4>
                <p className="font-semibold">
                  Role:{" "}
                  <span className="text-sky-500 uppercase">{data?.role}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyInfo;
