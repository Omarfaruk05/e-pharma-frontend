import React from "react";
import { IoBagCheckOutline, IoCloseCircleOutline } from "react-icons/io5";
import ShoppingItem from "./ShoppingItem";
import { useSelector } from "react-redux";
import { IProduct } from "@/types";
import { calculateAvailablePrice } from "@/utils/calfulateAvailablePrice";

const ShoppingItems = ({
  close,
  isCheckout,
}: {
  close: () => void;
  isCheckout: () => void;
}) => {
  const { cart } = useSelector((state: any) => state?.cart);
  const { isLoggedIn } = useSelector((state: any) => state?.user);

  return (
    <div className="w-full ">
      <div className="w-full flex justify-between items-center gap-4 p-4 bg-sky-400 rounded-t-xl text-white">
        <div>
          <h2 className="text-3xl font-semibold">{cart?.length} Items</h2>
        </div>
        <div className="flex gap-4 items-center">
          <h3 className="text-3xl bg-sky-600 p rounded-lg shadow-md border border-white p-2">
            Total:{" "}
            {cart.reduce(
              (total: any, item: any) =>
                total +
                calculateAvailablePrice(item.price, item.discount) *
                  item.quantity,
              0
            )}{" "}
            TK
          </h3>
          <IoCloseCircleOutline onClick={close} size={32} />
        </div>
      </div>
      <div className="flex justify-between items-center rounded-xl m-4 overflow-hidden">
        {/* cart content  */}
        <div className=" h-[500px] w-full overflow-y-auto p-4">
          {cart &&
            cart?.map((product: IProduct, index: number) => (
              <ShoppingItem product={product} key={index} />
            ))}
        </div>
      </div>
      {isLoggedIn ? (
        <div className="flex justify-between items-center gap-4 p-4 bg-gray-800 rounded-b-xl text-white">
          <div>
            <h2 className="md:text-2xl font-semibold">
              Are you ready to checkout?
            </h2>
          </div>
          <div className="flex gap-4 items-center">
            <button
              onClick={isCheckout}
              className="flex items-center gap-2 bg-sky-500 rounded-lg p-2"
            >
              <IoBagCheckOutline size={24} />
              Checkout
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center gap-4 p-4 bg-gray-800 rounded-b-xl text-white">
          <div>
            <h2 className="md:text-2xl text-red-600 font-semibold">
              For checkout you have to login first.
            </h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingItems;
