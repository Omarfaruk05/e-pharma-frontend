"use client";
import { IoBagOutline } from "react-icons/io5";
import { CiUser } from "react-icons/ci";
import { CgMenuLeft } from "react-icons/cg";
import { useState } from "react";
import AuthModal from "../Modal/AuthModal";
import { IoIosLogIn, IoIosLogOut } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { removeUserInfo } from "@/services/auth.service";
import { AUTH_KEY } from "@/constants/storageKey";
import { logout } from "@/redux/slice/userSlice";
import ShoppingModal from "../Modal/ShoppingModal";
import Link from "next/link";

const MobileNav = ({ toggleSidebar }: any) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isShoppingModalOpen, setShoppingModalOpen] = useState(false);
  const dispatch = useDispatch();

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const openShoppingModal = () => setShoppingModalOpen(true);
  const closeShoppingModal = () => setShoppingModalOpen(false);

  const loginResponse = useSelector((state: any) => state?.user);
  const { cart } = useSelector((state: any) => state?.cart);
  const isLoggedIn = loginResponse?.isLoggedIn;

  const router = useRouter();
  const logOut = () => {
    removeUserInfo(AUTH_KEY);
    dispatch(logout());
    router.push("/");
  };

  return (
    <div className="flex justify-between items-center md:hidden">
      <div onClick={toggleSidebar}>
        <CgMenuLeft size={32} />
      </div>
      <Link href={"/dashboard/user"}>
        <CiUser size={32} />
      </Link>
      <div className="relative">
        <IoBagOutline onClick={openShoppingModal} size={32} />{" "}
        <p className="text-sm absolute w-5 h-5 rounded-full bg-red-500 text-white top-0 right-0 grid place-items-center">
          {cart?.length}
        </p>
        <ShoppingModal
          isOpen={isShoppingModalOpen}
          close={closeShoppingModal}
        />
      </div>
      <div>
        {isLoggedIn ? (
          <IoIosLogOut onClick={logOut} className="text-red-500" size={32} />
        ) : (
          <IoIosLogIn onClick={openModal} className="text-sky-500" size={32} />
        )}
        <AuthModal isOpen={isModalOpen} close={closeModal} />
      </div>
    </div>
  );
};

export default MobileNav;
