// components/layout/MobileLayout.js
"use client";

import React, { useState } from "react";
import MobileNav from "@/components/ui/MobileNav";
import HamburgerSidebar from "@/components/ui/HamburgerSidebar";

const MobileLayout = () => {
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
      <HamburgerSidebar isOpen={isSidebarOpen} closeSidebar={closeSidebar} />
    </div>
  );
};

export default MobileLayout;
