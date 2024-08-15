"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { CiUser } from "react-icons/ci";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { LuUsers2 } from "react-icons/lu";
import { FcShipped } from "react-icons/fc";
import { BiCategory } from "react-icons/bi";
import { FaRegAddressCard } from "react-icons/fa";
import { RiAdminLine } from "react-icons/ri";
import { MdModelTraining, MdOutlineShoppingCart } from "react-icons/md";
import { getUserInfo } from "@/services/auth.service";

const DashboardSidebar = ({ closeSidebar }: { closeSidebar?: () => void }) => {
  const [role, setRole] = useState("");

  useEffect(() => {
    const user = getUserInfo() as any;
    setRole(user?.role);
    console.log(user);
  }, [role]);

  return (
    <div className="sticky top-20 text-white">
      {role === "user" && (
        <div className="w-full p-3 space-y-3 ">
          <Link
            onClick={closeSidebar}
            className="rounded-md bg-slate-700 hover:bg-sky-400 flex p-2 justify-center items-center gap-4 w-full"
            href={"/dashboard/user"}
          >
            <CiUser size={20} />
            <span>My Profile</span>
          </Link>
          <Link
            onClick={closeSidebar}
            className="rounded-md bg-slate-700 hover:bg-sky-400 flex p-2 justify-center items-center gap-4 w-full"
            href={"/dashboard/user/orders"}
          >
            <MdOutlineProductionQuantityLimits size={20} />
            <span>My Orders</span>
          </Link>
        </div>
      )}
      {role === "admin" && (
        <div className=" w-full p-3 space-y-3 ">
          <Link
            onClick={closeSidebar}
            className="rounded-md bg-slate-700 hover:bg-sky-400 flex p-2 justify-center items-center gap-4 w-full"
            href={`/dashboard/${role}`}
          >
            <CiUser size={20} />
            <span onClick={closeSidebar}>My Profile</span>
          </Link>
          <Link
            onClick={closeSidebar}
            className="rounded-md bg-slate-700 hover:bg-sky-400 flex p-2 justify-center items-center gap-4 w-full"
            href={`/dashboard/${role}/users`}
          >
            <LuUsers2 size={20} />
            <span>All Users</span>
          </Link>
          <Link
            onClick={closeSidebar}
            className="rounded-md bg-slate-700 hover:bg-sky-400 flex p-2 justify-center items-center gap-4 w-full"
            href={`/dashboard/${role}/orders`}
          >
            <FcShipped size={20} />
            <span>All Orders</span>
          </Link>
          <Link
            onClick={closeSidebar}
            className="rounded-md bg-slate-700 hover:bg-sky-400 flex p-2 justify-center items-center gap-4 w-full"
            href={`/dashboard/${role}/categories`}
          >
            <BiCategory size={20} />
            <span>Categories</span>
          </Link>
          <Link
            onClick={closeSidebar}
            className="rounded-md bg-slate-700 hover:bg-sky-400 flex p-2 justify-center items-center gap-4 w-full"
            href={`/dashboard/${role}/variants`}
          >
            <MdModelTraining size={20} />
            <span>Variants</span>
          </Link>
          <Link
            onClick={closeSidebar}
            className="rounded-md bg-slate-700 hover:bg-sky-400 flex p-2 justify-center items-center gap-4 w-full"
            href={`/dashboard/${role}/products`}
          >
            <MdOutlineShoppingCart size={20} />
            <span>Products</span>
          </Link>
          <Link
            onClick={closeSidebar}
            className="rounded-md bg-slate-700 hover:bg-sky-400 flex p-2 justify-center items-center gap-4 w-full"
            href={`/dashboard/${role}/shippingAddresses`}
          >
            <FaRegAddressCard size={20} />
            <span>Shipping Address</span>
          </Link>
        </div>
      )}
      {role === "super-admin" && (
        <div className=" w-full p-3 space-y-3 ">
          <Link
            onClick={closeSidebar}
            className="rounded-md bg-slate-700 hover:bg-sky-400 flex p-2 justify-center items-center gap-4 w-full"
            href={"#"}
          >
            <CiUser size={20} />
            <span>My Profile</span>
          </Link>
          <Link
            onClick={closeSidebar}
            className="rounded-md bg-slate-700 hover:bg-sky-400 flex p-2 justify-center items-center gap-4 w-full"
            href={"#"}
          >
            <RiAdminLine size={20} />
            <span>All Admins</span>
          </Link>
          <Link
            onClick={closeSidebar}
            className="rounded-md bg-slate-700 hover:bg-sky-400 flex p-2 justify-center items-center gap-4 w-full"
            href={"#"}
          >
            <LuUsers2 size={20} />
            <span>All Users</span>
          </Link>
          <Link
            onClick={closeSidebar}
            className="rounded-md bg-slate-700 hover:bg-sky-400 flex p-2 justify-center items-center gap-4 w-full"
            href={"#"}
          >
            <FcShipped size={20} />
            <span>All Orders</span>
          </Link>
          <Link
            onClick={closeSidebar}
            className="rounded-md bg-slate-700 hover:bg-sky-400 flex p-2 justify-center items-center gap-4 w-full"
            href={"#"}
          >
            <BiCategory size={20} />
            <span>Categories</span>
          </Link>
          <Link
            onClick={closeSidebar}
            className="rounded-md bg-slate-700 hover:bg-sky-400 flex p-2 justify-center items-center gap-4 w-full"
            href={"#"}
          >
            <MdModelTraining size={20} />
            <span>Variants</span>
          </Link>
          <Link
            onClick={closeSidebar}
            className="rounded-md bg-slate-700 hover:bg-sky-400 flex p-2 justify-center items-center gap-4 w-full"
            href={"#"}
          >
            <MdOutlineShoppingCart size={20} />
            <span>Products</span>
          </Link>
          <Link
            onClick={closeSidebar}
            className="rounded-md bg-slate-700 hover:bg-sky-400 flex p-2 justify-center items-center gap-4 w-full"
            href={"#"}
          >
            <FaRegAddressCard size={20} />
            <span>Shipping Address</span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default DashboardSidebar;
