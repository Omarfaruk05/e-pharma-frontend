import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Nav from "@/components/ui/Nav";
import MobileLayout from "@/components/layout/MobileLayout";
import DashboardSidebar from "@/components/ui/DashboardSidebar";
import Providers from "@/lib/Providers";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainContainer from "@/components/layout/MainContainer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "E Pharma",
  description: "Generated by Next Js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <html lang="en">
        <body className={inter.className}>
          <div className="sticky top-0 z-20">
            <Nav />
          </div>
          <div className="flex gap-8">
            <div className="p-3 hidden lg:block lg:w-96 text-white bg-slate-800 h-lvh sticky top-20">
              <DashboardSidebar />
            </div>
            <div className="w-full">{children}</div>
          </div>
          <div id="portal-root" />
          <div className="sticky bottom-0 ">
            <MobileLayout />
          </div>
          <ToastContainer />
        </body>
      </html>
    </Providers>
  );
}
