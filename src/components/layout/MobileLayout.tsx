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
    <div>
      <MobileNav toggleSidebar={toggleSidebar} />
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
