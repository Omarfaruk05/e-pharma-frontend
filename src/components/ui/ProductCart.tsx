"use client";

import Image from "next/image";
import { calculateAvailablePrice } from "@/utils/calfulateAvailablePrice";
import { useEffect, useState } from "react";
import { IProduct } from "@/types";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/redux/slice/cartSlice";
import ShoppingModal from "../Modal/ShoppingModal";
import Link from "next/link";

const ProductCart = ({ product }: { product: IProduct }) => {
  const [viewCart, setViewCart] = useState(false);
  const [isShoppingModalOpen, setShoppingModalOpen] = useState(false);
  const dispatch = useDispatch();

  const { cart } = useSelector((state: any) => state?.cart);

  const openShoppingModal = () => setShoppingModalOpen(true);
  const closeShoppingModal = () => setShoppingModalOpen(false);

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        product,
        quantity: 1,
        variantId: product?.variants[0]?._id as string,
      })
    );
    setViewCart(true);
  };

  useEffect(() => {
    const isAlreadyExist = cart.find((x: any) => x._id === product?._id);
    if (!isAlreadyExist) {
      setViewCart(false);
    }
  }, [cart, product?._id]);

  return (
    <div className="p-4 bg-gray-100 rounded-lg space-y-3">
      <div>
        <Link href={`/product/${product?._id}`}>
          <Image
            className="w-full rounded-xl"
            src={product?.photos[0]}
            width={200}
            alt="product-image"
          />
        </Link>
      </div>

      <h4 className="text-xl font-semibold">{product?.name}</h4>
      <div className="text-sm">
        <h5 className="text-lime-500">
          {product?.description?.slice(0, 30)}...
        </h5>
      </div>

      <div className="flex gap-2 justify-between items-center">
        <h3 className="text-xl font-semibold">
          ৳ {calculateAvailablePrice(product?.price, product?.discount)}
        </h3>
        <p className="text-gray-500 line-through">৳ {product?.price}</p>
        <p className="text-red-500 font-semibold">{product?.discount}% OFF</p>
      </div>
      <div>
        {viewCart ? (
          <div>
            <button
              onClick={openShoppingModal}
              className="w-full font-semibold rounded-md bg-cyan-500 px-2 py-1 text-white"
            >
              View Cart
            </button>
            <ShoppingModal
              isOpen={isShoppingModalOpen}
              close={closeShoppingModal}
            />
          </div>
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
