"use client";

import ProcessingBtn from "@/components/loading/ProcessingBtn";
import {
  useGetProductsQuery,
  useGetSingleProductQuery,
} from "@/redux/api/productApi";
import { IProduct } from "@/types";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import productImg from "../../../../assects/product.webp";
import { calculateAvailablePrice } from "@/utils/calfulateAvailablePrice";
import VariantDropdown from "@/components/ui/VariantDropdown";
import { addToCart } from "@/redux/slice/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import ShoppingModal from "@/components/Modal/ShoppingModal";
import PieceDropdown from "@/components/ui/PieceDropdown";
import ProductCart from "@/components/ui/ProductCart";
import { FaRegRectangleList } from "react-icons/fa6";
import { TbListDetails } from "react-icons/tb";

const ProductDetailsPage = ({ params }: { params: { id: string } }) => {
  const id: string = params?.id;
  const dispatch = useDispatch();

  const { data, isLoading } = useGetSingleProductQuery(id);
  const product: IProduct = data;

  const { cart } = useSelector((state: any) => state?.cart);

  const { data: productsData, isLoading: productsLoading } =
    useGetProductsQuery({
      primaryId: product?.categories?.primary?._id,
    });

  console.log(product);
  const products = productsData?.products.slice(0, 6);
  const [price, setPrice] = useState(product?.price);
  const [variant, setVariant] = useState(product?.variants[0]._id);
  const [quantity, setQuantity] = useState(1);
  const [viewCart, setViewCart] = useState(false);
  const [isShoppingModalOpen, setShoppingModalOpen] = useState(false);

  const openShoppingModal = () => setShoppingModalOpen(true);
  const closeShoppingModal = () => setShoppingModalOpen(false);

  useEffect(() => {
    const isAlreadyExist = cart.find((x: any) => x._id === product?._id);
    if (!isAlreadyExist) {
      setViewCart(false);
    }
  }, [cart, product?._id]);
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

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };
  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        product,
        quantity,
        variantId: product?.variants[0]?._id as string,
      })
    );
    setViewCart(true);
  };

  const handlePiece = (piece: number) => {
    setQuantity(piece);
  };

  return (
    <div className="m-4 space-y-6">
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
        <div className="md:min-w-96 border-2 border-gray-200 p-4 rounded-lg space-y-4">
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
              ৳{" "}
              {(
                calculateAvailablePrice(price, product?.discount) * quantity
              ).toFixed(2)}
            </h3>
            <p className="text-gray-500 line-through">
              ৳ {(price * quantity).toFixed(2)}
            </p>
            <p className="text-red-500 font-semibold">
              {product?.discount}% OFF
            </p>
          </div>
          <div className="flex gap-3 justify-between">
            <VariantDropdown
              variants={product?.variants}
              handlePrice={handlePrice}
              handleVariant={handleVariant}
            />
            <button className="w-20 md:w-32 flex justify-between  items-center px-2 border rounded-md">
              <span onClick={handleDecrease}>-</span> <span>{quantity}</span>{" "}
              <span onClick={handleIncrease}>+</span>
            </button>
          </div>
          <div className="relative flex w-full">
            <PieceDropdown handlePiece={handlePiece} />
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
      </div>

      {/* discriptions  */}
      <div>
        <h3 className="text-2xl font-semibold flex gap-2 items-center my-4">
          <TbListDetails />
          <span>Descriptions</span>
        </h3>
        <p>{product?.description}</p>
      </div>

      {/* related products  */}
      <div>
        <h3 className="text-2xl font-semibold flex gap-2 items-center my-4">
          <FaRegRectangleList />
          <span>Alternatives</span>
        </h3>
        <div className="  grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-4">
          {products.map((product: IProduct, index: number) => (
            <ProductCart product={product} key={product._id || index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
