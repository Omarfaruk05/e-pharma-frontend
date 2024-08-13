import React from "react";
import {
  IoBagCheckOutline,
  IoCloseCircleOutline,
  IoTrashBinOutline,
} from "react-icons/io5";
import ShoppingItem from "./ShoppingItem";

const ShoppingItems = ({
  close,
  isCheckout,
}: {
  close: () => void;
  isCheckout: () => void;
}) => {
  const nums = [1, 2, 3, 4, 5, 6];

  return (
    <div>
      <div className="flex justify-between gap-4 p-4 bg-sky-400 rounded-t-xl text-white">
        <div>
          <h2 className="text-3xl font-semibold">2 Items</h2>
        </div>
        <div className="flex gap-4 items-center">
          <button className="flex items-center gap-2 border rounded-lg p-2">
            <IoTrashBinOutline size={25} />
            Clear All
          </button>
          <IoCloseCircleOutline onClick={close} size={32} />
        </div>
      </div>
      <div className="flex justify-between items-center rounded-xl m-4 overflow-hidden">
        {/* cart content  */}
        <div className=" h-[500px] overflow-y-auto p-4">
          {nums.map((product, index) => (
            <ShoppingItem key={index} />
          ))}
        </div>
      </div>
      <div className="flex justify-between gap-4 p-4 bg-gray-800 rounded-b-xl text-white">
        <div>
          <h2 className="text-3xl font-semibold">Are you ready to checkout?</h2>
        </div>
        <div className="flex gap-4 items-center">
          <button
            onClick={isCheckout}
            className="flex items-center gap-2 bg-sky-500 rounded-lg p-2"
          >
            <IoBagCheckOutline size={24} />
            Proceed To Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingItems;
