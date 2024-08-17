import { IVariant } from "@/types";
import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

const PieceDropdown = ({ handlePiece }: { handlePiece: any }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block text-left bg-white w-full">
      {/* Button */}
      <button
        onClick={toggleDropdown}
        className="relative w-full text-center py-1 px-2 border rounded-md"
      >
        <span>Piece</span>
        <IoIosArrowDown className="absolute right-2 top-2" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute left-0  mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <p
              onClick={() => handlePiece(10)}
              className=" cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              10 Piece
            </p>
            <p
              onClick={() => handlePiece(20)}
              className=" cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              20 Piece
            </p>
            <p
              onClick={() => handlePiece(50)}
              className=" cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              50 Piece
            </p>
            <p
              onClick={() => handlePiece(100)}
              className=" cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              100 Piece
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PieceDropdown;
