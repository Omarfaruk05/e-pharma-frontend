"use client";
import { IoBagOutline, IoHomeOutline } from "react-icons/io5";
import { CiUser } from "react-icons/ci";
import { CgMenuLeft } from "react-icons/cg";
import { useState } from "react";
import AuthModal from "../Modal/AuthModal";

const MobileNav = ({ toggleSidebar }: any) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  return (
    <div className="flex justify-between items-center p-2 bg-white md:hidden">
      <div onClick={toggleSidebar}>
        <CgMenuLeft size={32} />
      </div>
      <div>
        <IoHomeOutline size={32} />
      </div>
      <div>
        <IoBagOutline size={32} />
      </div>
      <div>
        <CiUser onClick={openModal} size={32} />
        <AuthModal isOpen={isModalOpen} close={closeModal} />
      </div>
    </div>
  );
};

export default MobileNav;
