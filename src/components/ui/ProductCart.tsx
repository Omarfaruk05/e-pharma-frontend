"use client";

import Image from "next/image";
import productImg from "../../assects/product.webp";
import { calculateAvailablePrice } from "@/utils/calfulateAvailablePrice";
import { useState } from "react";

const ProductCart = ({ product }) => {
  const [viewCart, setViewCart] = useState(false);

  const handleAddToCart = () => {
    setViewCart(true);
  };
  return (
    <div className="p-4 bg-gray-100 rounded-lg space-y-3">
      <div>
        <Image
          className="w-full rounded-xl"
          src={productImg}
          width={200}
          alt="product-image"
        />
      </div>

      <h4 className="text-xl font-semibold">{product?.name}</h4>
      <div className="text-sm">
        <h5 className="text-lime-500">{product?.description?.slice(0, 70)}.</h5>
      </div>

      <div className="flex gap-2 justify-between items-center">
        <h3 className="text-xl font-semibold">
          ৳ {calculateAvailablePrice(product?.price, product?.discount)}
        </h3>
        <p className="text-gray-500  line-through">৳ {product?.price}</p>
        <p className="text-red-500 font-semibold">{product?.discount}% OFF</p>
      </div>
      <div>
        {viewCart ? (
          <button className="w-full font-semibold rounded-md bg-cyan-500 px-2 py-1 text-white">
            View Cart
          </button>
        ) : (
          <button
            onClick={handleAddToCart}
            className="w-full font-semibold rounded-md bg-sky-500 px-2 py-1 text-white"
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCart;
