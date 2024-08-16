"use client";

import { useEffect, useState } from "react";
import { IoBagOutline, IoChevronDown } from "react-icons/io5";
import ShoppingModal from "../Modal/ShoppingModal";
import Link from "next/link";
import MainContainer from "../layout/MainContainer";
import { getUserInfo, removeUserInfo } from "@/services/auth.service";
import { AUTH_KEY } from "@/constants/storageKey";
import { loginSuccess, logout } from "@/redux/slice/userSlice";
import { useDispatch, useSelector } from "react-redux";
import AuthModal from "../Modal/AuthModal";
import { CiUser } from "react-icons/ci";
import { useRouter } from "next/navigation";
import Input from "../form/Input";

const Nav = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isShoppingModalOpen, setShoppingModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const router = useRouter();

  const { cart } = useSelector((state: any) => state?.cart);

  const { _id, role } = getUserInfo() as any;
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoggedIn(!!_id);
  }, [_id]);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const openShoppingModal = () => setShoppingModalOpen(true);
  const closeShoppingModal = () => setShoppingModalOpen(false);

  const handleSearch = (event: any) => {
    event?.preventDefault();
    const searchText = event.target.search.value;
    router.push(`/product?searchTerm=${searchText}`);
  };

  const logOut = () => {
    removeUserInfo(AUTH_KEY);
    dispatch(logout());
    setIsLoggedIn(false);
    router.push("/");
  };

  if (_id) {
    dispatch(loginSuccess());
  }

  return (
    <div className="bg-sky-400 sticky top-0 z-10 md:z-20">
      <MainContainer>
        <div className="p-4 flex flex-col md:flex-row justify-between gap-4 items-center text-white">
          <div className="flex justify-between">
            <Link
              href={"/"}
              className="text-xl md:text-2xl font-semibold text-center"
            >
              E Pharma
            </Link>
          </div>
          <div className="mx-8">
            <form onSubmit={handleSearch} className="flex">
              <Input
                type="text"
                name="search"
                id="search"
                placeholder="Search here"
              />
              <button
                type="submit"
                className="font-semibold bg-gray-50 my-1 px-2 rounded-md text-gray-700"
              >
                Search
              </button>
            </form>
          </div>
          <div className="hidden md:flex  items-center gap-8">
            <div className="relative bg-white text-sky-400 p-2 rounded-2xl">
              <IoBagOutline onClick={openShoppingModal} size={28} />
              <p className="text-sm text-center font-semibold rounded-full w-5 h-5 text-white bg-red-500 absolute -top-1 -right-1">
                {cart?.length}
              </p>
              <ShoppingModal
                isOpen={isShoppingModalOpen}
                close={closeShoppingModal}
              />
            </div>
            <div className="h-8 w-[3px] rounded-full bg-white"></div>
            <div className="flex gap-3">
              {isLoggedIn && (
                <Link href={`/dashboard/${role}`}>
                  <CiUser
                    className="bg-white rounded-full text-sky-400 p-2"
                    size={40}
                  />
                </Link>
              )}
              {isLoggedIn === null ? (
                <span>Loading...</span>
              ) : isLoggedIn ? (
                <button
                  onClick={logOut}
                  className="bg-red-500 flex justify-between items-center gap-2 border border-white p-2 rounded-md"
                >
                  <span className="font-semibold">Log Out</span>
                  <IoChevronDown size={20} />
                </button>
              ) : (
                <button
                  onClick={openModal}
                  className="bg-sky-500 flex items-center gap-2 border border-white p-2 rounded-md"
                >
                  <span className="font-semibold">Sign In</span>
                  <IoChevronDown size={20} />
                </button>
              )}
              <AuthModal isOpen={isModalOpen} close={closeModal} />
            </div>
          </div>
        </div>
      </MainContainer>
    </div>
  );
};

export default Nav;
