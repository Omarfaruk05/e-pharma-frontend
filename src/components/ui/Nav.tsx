"use client";

import MainContainer from "../layout/MainContainer";

const Nav = () => {
  const handleSearch = (event: any) => {
    event?.preventDefault();
  };
  return (
    <div className="bg-sky-400 sticky top-0 z-20">
      <MainContainer>
        <div className="p-4 flex flex-col md:flex-row justify-between gap-4 items-center text-white">
          <div>
            <h2 className="text-xl md:text-2xl font-semibold text-center">
              E Pharma
            </h2>
          </div>
          <div className="">
            <form onSubmit={handleSearch} className="relative flex w-full">
              <input className="p-2 text-gray-800 focus:outline-none rounded-md w-96 md:mx-24" />
            </form>
          </div>
          <div className=""></div>
        </div>
      </MainContainer>
    </div>
  );
};

export default Nav;
