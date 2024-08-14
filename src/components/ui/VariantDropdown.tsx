import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

const VariantDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className=" inline-block text-left bg-white">
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
        <div className="absolute left-0 z-20  mt-2 min-w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Option 1
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Option 2
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Option 3
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default VariantDropdown;
