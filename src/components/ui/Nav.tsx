"use client";

import MainContainer from "../layout/MainContainer";
import { IoBagOutline, IoChevronDown } from "react-icons/io5";
import { CiUser } from "react-icons/ci";

const Nav = () => {
  const handleSearch = (event: any) => {
    event?.preventDefault();
  };
  return (
    <div className="bg-sky-400 sticky top-0 z-20">
      <MainContainer>
        <div className="p-4 flex flex-col md:flex-row justify-between gap-4 items-center text-white">
          <div className="flex justify-between">
            <h2 className="text-xl md:text-2xl font-semibold text-center">
              E Pharma
            </h2>
          </div>
          <div className="">
            <form onSubmit={handleSearch} className="">
              <input className="p-2 text-gray-800 focus:outline-none rounded-md w-96 md:w-60 lg:w-96 md:mx-24" />
            </form>
          </div>
          <div className="hidden md:flex  items-center gap-8">
            <div className="bg-white text-sky-400 p-2 rounded-2xl">
              <IoBagOutline className="" size={28} />
            </div>
            <div className="h-8 w-[3px] rounded-full bg-white"></div>
            <div>
              <button className="flex items-center gap-2">
                <CiUser
                  className="bg-white rounded-full text-sky-400 p-2"
                  size={40}
                />
                <span className="font-semibold">Sing In</span>
                <IoChevronDown size={20} />
              </button>
            </div>
          </div>
        </div>
      </MainContainer>
    </div>
  );
};

export default Nav;
