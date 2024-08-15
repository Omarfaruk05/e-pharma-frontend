"use client";
import React from "react";
import HomeProducts from "./HomeProducts";
import { useGetCategoriesQuery } from "@/redux/api/categoryApi";
import { ICategory } from "@/types";

const HomepageProductGroup = () => {
  const query: Record<string, any> = {};
  const { data, isLoading: categoryLoading } = useGetCategoriesQuery({
    ...query,
  });
  const categories: ICategory[] = data?.categories.slice(0, 3);

  if (categoryLoading) {
    return <p>Loading...</p>;
  }
  return (
    <div className="space-y-20">
      {categories &&
        categories.map((category: any, index: any) => (
          <HomeProducts
            key={index}
            category={category?.name}
            path={category?._id}
          />
        ))}
    </div>
  );
};

export default HomepageProductGroup;
