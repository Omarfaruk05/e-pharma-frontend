"use client";

import React, { useState } from "react";
import MobileNav from "@/components/ui/MobileNav";
import HamburgerSidebar from "@/components/ui/HamburgerSidebar";
import DashboardHamburger from "../ui/DashboardHamburger";

const MobileLayout = ({ dashboard }: any) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="w-full bg-gray-100 py-4">
      <div className="mx-4">
        <MobileNav toggleSidebar={toggleSidebar} />
      </div>
      {dashboard ? (
        <DashboardHamburger
          isOpen={isSidebarOpen}
          closeSidebar={closeSidebar}
        />
      ) : (
        <HamburgerSidebar isOpen={isSidebarOpen} closeSidebar={closeSidebar} />
      )}
    </div>
  );
};

export default MobileLayout;
