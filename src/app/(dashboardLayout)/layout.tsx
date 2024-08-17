import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Nav from "@/components/ui/Nav";
import MobileLayout from "@/components/layout/MobileLayout";
import DashboardSidebar from "@/components/ui/DashboardSidebar";
import Providers from "@/lib/Providers";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { metadata } from "@/utils/metadata";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Primary Meta Tags */}
        <meta name="description" content={metadata.description as string} />
        <meta name="keywords" content={metadata.keywords as any} />
        <meta name="viewport" content={metadata.viewport as any} />

        {/* Open Graph / Facebook */}
        <meta property="og:url" content={metadata.openGraph?.url as string} />
        <meta
          property="og:title"
          content={metadata.openGraph?.title as string}
        />
        <meta
          property="og:description"
          content={metadata.openGraph?.description as string}
        />

        {/* Twitter */}
        <meta name="twitter:site" content={metadata.twitter?.site} />
        <meta
          name="twitter:title"
          content={metadata.twitter?.title as string}
        />
        <meta
          name="twitter:description"
          content={metadata.twitter?.description}
        />
        <meta
          name="twitter:image"
          content={metadata.twitter?.images as string}
        />

        <link rel="canonical" href="https://e-pharma-frontend.vercel.app" />
      </head>
      <body className={inter.className}>
        <Providers>
          <div className="sticky top-0">
            <Nav />
          </div>
          <div className="flex">
            <div className="p-3 hidden lg:block text-white bg-slate-800 h-lvh">
              <DashboardSidebar />
            </div>
            <div className="w-full">{children}</div>
          </div>
          <div id="portal-root" />
          <div className="fixed bottom-0 w-full z-30">
            <MobileLayout dashboard={true} />
          </div>
          <ToastContainer />
        </Providers>
      </body>
    </html>
  );
}
