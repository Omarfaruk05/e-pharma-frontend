"use client";

import Image from "next/image";
import productImage from "../../assects/product.webp";
import { IoIosArrowDown } from "react-icons/io";
import { useState } from "react";
import VariantDropdown from "./VariantDropdown";

const ShoppingItem = () => {
  const [quanity, setQuantity] = useState(1);
  const [isOpen, setIsOpen] = useState(false);

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
          <div className="flex gap-3 relative">
            <VariantDropdown />
            <button className="w-32 flex justify-between  items-center px-2 border rounded-md">
              <span onClick={() => setQuantity(quanity - 1)}>-</span>{" "}
              <span>{quanity}</span>{" "}
              <span onClick={() => setQuantity(quanity + 1)}>+</span>
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
