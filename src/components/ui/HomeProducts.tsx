import Link from "next/link";
import React from "react";
import ProductCart from "./ProductCart";

const HomeProducts = ({
  category,
  path,
}: {
  category: string;
  path: string;
}) => {
  const nums = [1, 2, 3, 4, 5, 6];
  return (
    <div>
      <div className="space-y-3">
        <div className="font-semibold flex justify-between items-center">
          <h4 className="text-2xl">{category}</h4>
          <Link className="text-blue-400 underline" href={`/${path}`}>
            See All
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  2xl:grid-cols-6 gap-4">
          {nums.map((x) => (
            <ProductCart key={x} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeProducts;
