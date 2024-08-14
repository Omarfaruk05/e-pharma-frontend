"use client";

import { useGetCategoriesQuery } from "@/redux/api/categoryApi";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";

const Sidebar = () => {
  const { data, isLoading: categoryLoading } = useGetCategoriesQuery({});
  const categories = data?.data;

  if (categoryLoading) {
    return <p>Loading...</p>;
  }
  return (
    <div className=" w-full p-3 space-y-2 ">
      <div className="my-4 flex">
        <Link
          className="bg-sky-500 text-white p-2 rounded-md w-full"
          href={"/product"}
        >
          All Products
        </Link>
      </div>
      {categories &&
        categories.map((category: any, index: any) => (
          <Link
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
