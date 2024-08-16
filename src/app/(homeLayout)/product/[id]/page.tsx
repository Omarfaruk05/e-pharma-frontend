"use client";

import ProcessingBtn from "@/components/loading/ProcessingBtn";
import { useGetSingleProductQuery } from "@/redux/api/productApi";
import { IProduct } from "@/types";
import Image from "next/image";
import React, { useState } from "react";
import productImg from "../../../../assects/product.webp";
import { calculateAvailablePrice } from "@/utils/calfulateAvailablePrice";
import VariantDropdown from "@/components/ui/VariantDropdown";

const ProductDetailsPage = ({ params }: { params: { id: string } }) => {
  const id: string = params?.id;

  const { data, isLoading } = useGetSingleProductQuery(id);
  const product: IProduct = data;
  const [price, setPrice] = useState(product?.price);
  const [variant, setVariant] = useState(product?.variants[0]._id);
  console.log(product);
  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <div className="w-fit">
          <ProcessingBtn />
        </div>
      </div>
    );
  }
  const handlePrice = (price: number) => {
    setPrice(price);
  };
  const handleVariant = (variant: string) => {
    setVariant(variant);
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-20 justify-center">
        <div>
          <Image
            className="w-full rounded-lg"
            src={productImg}
            width={700}
            height={300}
            alt="product_image"
          />
        </div>
        <div className="min-w-96 border-2 border-gray-200 p-4 rounded-lg space-y-4">
          <h2 className="text-3xl font-bold text-gray-800">{product?.name}</h2>
          <div>
            <p>
              Primary Cateogry:{" "}
              <span className="text-green-600">
                {product?.categories?.primary?.name}
              </span>
            </p>
            <p>
              Secondary Cateogry:{" "}
              <span className="text-green-600">
                {product?.categories?.secondary?.name}
              </span>
            </p>
            <p>
              Tertiry Cateogry:
              <span className="text-green-600">
                {" "}
                {product?.categories?.tertiary?.name}
              </span>
            </p>
          </div>
          <div className="flex gap-2 justify-between items-center bg-slate-100 p-2 rounded-lg">
            <h3 className="text-xl font-semibold">
              ৳ {calculateAvailablePrice(price, product?.discount)}
            </h3>
            <p className="text-gray-500 line-through">৳ {price}</p>
            <p className="text-red-500 font-semibold">
              {product?.discount}% OFF
            </p>
          </div>
          <div className="w-full">
            <VariantDropdown
              variants={product?.variants}
              handlePrice={handlePrice}
              handleVariant={handleVariant}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
