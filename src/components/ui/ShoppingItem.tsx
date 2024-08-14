"use client";

import Image from "next/image";
import productImage from "../../assects/product.webp";
import { IoIosArrowDown } from "react-icons/io";
import { useEffect, useState } from "react";
import VariantDropdown from "./VariantDropdown";
import { IProduct } from "@/types";
import { useDispatch } from "react-redux";
import {
  addToCart,
  decreaseQuantity,
  removeFromCart,
} from "@/redux/slice/cartSlice";
import { calculateAvailablePrice } from "@/utils/calfulateAvailablePrice";
import { IoCloseCircleOutline } from "react-icons/io5";

const ShoppingItem = ({ product }: { product: IProduct }) => {
  const [quanity, setQuantity] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [price, setPrice] = useState(Number);
  const [variant, setVariant] = useState(product?.variants[0]._id);

  console.log(price);
  const dispatch = useDispatch();

  useEffect(() => {
    setPrice(product?.price);
  }, []);

  const handlePrice = (price: number) => {
    setPrice(price);
  };
  const handleVariant = (variant: string) => {
    setVariant(variant);
  };
  return (
    <div>
      <div className="flex items-center justify-between gap-2 md:gap-24 py-4">
        <div>
          <Image
            className="w-full h-20 rounded-xl"
            src={productImage}
            alt="product_image"
          />
        </div>
        <div className="space-y-1">
          <h3 className="text-xl font-semibold">{product?.name}</h3>
          <p className="text-green-600">
            {product?.description.slice(0, 60)}...
          </p>
          <div className="flex gap-3 relative">
            <VariantDropdown
              variants={product?.variants}
              handlePrice={handlePrice}
              handleVariant={handleVariant}
            />
            <button className="w-20 md:w-32 flex justify-between  items-center px-2 border rounded-md">
              <span onClick={() => dispatch(decreaseQuantity(product))}>-</span>{" "}
              <span>{product?.quantity}</span>{" "}
              <span
                onClick={() =>
                  dispatch(
                    addToCart({ product, quantity: 1, variantId: variant })
                  )
                }
              >
                +
              </span>
            </button>
          </div>
        </div>
        <div>
          <p>
            <h3 className="md:text-2xl font-semibold">
              {product?.quantity &&
                (
                  calculateAvailablePrice(price, product?.discount) *
                  product?.quantity
                ).toFixed(2)}
            </h3>
            <p className="line-through">
              {product?.quantity
                ? (price * product.quantity).toFixed(2)
                : product?.price}
            </p>
          </p>
        </div>
        <div>
          <IoCloseCircleOutline
            onClick={() => dispatch(removeFromCart(product?._id))}
            size={32}
          />
        </div>
      </div>
      <hr />
    </div>
  );
};

export default ShoppingItem;
