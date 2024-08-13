"use client";

import Image from "next/image";
import productImage from "../../assects/product.webp";
import { IoIosArrowDown } from "react-icons/io";
import { useState } from "react";

const ShoppingItem = () => {
  const [quanity, setQuantity] = useState(1);
  return (
    <div>
      <div className="flex gap-2 md:gap-24 py-4">
        <div>
          <Image
            className="w-full h-20 rounded-xl"
            src={productImage}
            alt="product_image"
          />
        </div>
        <div className="space-y-1">
          <h3 className="text-xl font-semibold">Ceevit</h3>
          <p className="text-green-600">Lorem ipsum dolor sit,</p>
          <div className="flex gap-3">
            <button className="w-40 flex justify-between items-center gap-2 py-1 px-2 border rounded-md">
              <span>Variant</span>
              <IoIosArrowDown />
            </button>{" "}
            <button className="w-32 flex justify-between  items-center py-1 px-2 border rounded-md">
              <span
                onClick={() => setQuantity(quanity - 1)}
                className="text-3xl"
              >
                -
              </span>{" "}
              <span>{quanity}</span>{" "}
              <span
                onClick={() => setQuantity(quanity + 1)}
                className="text-2xl"
              >
                +
              </span>
            </button>
          </div>
        </div>
        <p>
          <h3 className="text-2xl font-semibold">500 TK</h3>
          <p className="line-through">500 TK</p>
        </p>
      </div>
      <hr />
    </div>
  );
};

export default ShoppingItem;
