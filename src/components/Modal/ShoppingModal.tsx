"use client";
import Image from "next/image";
import Portal from "./Protal";
import {
  IoCloseCircleOutline,
  IoTrashBinOutline,
  IoBagCheckOutline,
} from "react-icons/io5";
import ShoppingItem from "../ui/ShoppingItem";
import ShoppingItems from "../ui/ShoppingItems";
import { useState } from "react";
import ShippingAddressFrom from "../form/ShippingAddressForm";

const ShoppingModal = ({
  isOpen,
  close,
}: {
  isOpen: boolean;
  close: () => void;
}) => {
  const [checkout, setCheckout] = useState(false);
  if (!isOpen) return null;

  const isCheckout = () => setCheckout(true);

  console.log(checkout);
  return (
    <Portal>
      <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center">
        <div className="bg-white rounded-xl relative">
          {/* cart header  */}
          {checkout ? (
            <ShippingAddressFrom close={close} isCheckout={isCheckout} />
          ) : (
            <ShoppingItems close={close} isCheckout={isCheckout} />
          )}
        </div>
      </div>
    </Portal>
  );
};

export default ShoppingModal;
