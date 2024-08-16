"use client";
import CategoriesTable from "@/components/table/CateogriesTable";
import { getUserInfo } from "@/services/auth.service";
import Link from "next/link";
import { useState } from "react";
import { BiSearch } from "react-icons/bi";

const CategoriesPage = () => {
  const { role } = getUserInfo() as any;
  const [searchTerm, setSearchTerm] = useState<string>("");
  const handleSearch = (event: any) => {
    event.preventDefault();
    setSearchTerm(event.target.searchTerm.value);
  };
  return (
    <div className="m-4">
      <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-3 my-4">
        <form
          className="flex justify-center items-center"
          onSubmit={handleSearch}
        >
          <input
            type="text"
            name="searchTerm"
            id="searchTerm"
            placeholder="Search here"
            className="m-1 border border-gray-200 p-2 text-gray-800 focus:outline-gray-200 rounded-md w-full"
          />
          <input
            className="bg-sky-500 text-white p-2 rounded-lg"
            type="submit"
            value={"Search"}
          />
        </form>
        <div>
          <Link
            className="cursor-pointer bg-slate-700 p-3 rounded-md text-white"
            href={`/dashboard/${role}/categories/create`}
          >
            Create Category
          </Link>
        </div>
      </div>
      <CategoriesTable searchTerm={searchTerm} />
    </div>
  );
};

export default CategoriesPage;
