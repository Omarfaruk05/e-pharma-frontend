import { IVariant } from "@/types";
import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

const VariantDropdown = ({
  variants,
  handlePrice,
  handleVariant,
}: {
  variants: any;
  handlePrice: any;
  handleVariant: any;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const handleVariants = (price: number, id: string) => {
    handlePrice(price);
    handleVariant(id);
  };
  return (
    <div className="relative inline-block text-left bg-white">
      {/* Button */}
      <button
        onClick={toggleDropdown}
        className="w-fit md:w-40 flex justify-between items-center gap-2 py-1 px-2 border rounded-md"
      >
        <span>Variant</span>
        <IoIosArrowDown />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute left-0  mt-2 min-w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {variants &&
              variants?.map((variant: IVariant, index: number) => (
                <p
                  onClick={() => handleVariants(variant?.price, variant?._id)}
                  key={index}
                  className=" cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  {variant?.variant}
                </p>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default VariantDropdown;
