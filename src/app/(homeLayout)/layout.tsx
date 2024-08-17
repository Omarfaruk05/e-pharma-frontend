// layout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Nav from "@/components/ui/Nav";
import Sidebar from "@/components/ui/Sidebar";
import MainContainer from "@/components/layout/MainContainer";
import Footer from "@/components/ui/Footer";
import MobileLayout from "@/components/layout/MobileLayout";
import Providers from "@/lib/Providers";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { metadata } from "@/utils/metadata";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
          <Nav />
          <MainContainer>
            <div className="flex gap-8 m-4 md:m-8">
              <div className=" hidden lg:block  bg-gray-100 rounded-lg h-fit md:min-w-40 xl:min-w-60  sticky top-20">
                <Sidebar />
              </div>
              <div className="flex-1">{children}</div>
            </div>
          </MainContainer>
          <div id="portal-root" />
          <Footer />
          <div className="fixed bottom-0 w-full z-30">
            <MobileLayout />
          </div>
          <ToastContainer />
        </Providers>
      </body>
    </html>
  );
}
