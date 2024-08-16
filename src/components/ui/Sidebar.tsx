"use client";

import { useGetCategoriesQuery } from "@/redux/api/categoryApi";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";
import ProcessingBtn from "../loading/ProcessingBtn";

const Sidebar = ({ closeSedebar }: any) => {
  const query: Record<string, any> = {};
  const { data, isLoading: categoryLoading } = useGetCategoriesQuery({
    ...query,
  });
  const categories = data?.categories;

  if (categoryLoading) {
    return (
      <div className="flex justify-center items-center w-screen">
        <div className="w-fit">
          <ProcessingBtn />
        </div>
      </div>
    );
  }
  return (
    <div className=" w-full p-3 space-y-2 ">
      <div className="my-4 flex">
        <Link
          onClick={closeSedebar}
          className="bg-sky-500 text-white p-2 rounded-md w-full"
          href={"/product"}
        >
          All Products
        </Link>
      </div>
      {categories &&
        categories.map((category: any, index: any) => (
          <Link
            onClick={closeSedebar}
            key={index}
            className="bg-gray-50 rounded-md hover:bg-lime-400 flex p-2 items-center justify-between w-full"
            href={{ pathname: "/product", query: { primaryId: category?._id } }}
          >
            <span>{category?.name}</span>{" "}
            <span>
              <IoIosArrowForward width={32} />
            </span>
          </Link>
        ))}
    </div>
  );
};

export default Sidebar;
