import { Metadata } from "next";

export const metadata: Metadata = {
  title: "E Pharma - Your Trusted Online Pharmacy",
  description:
    "E Pharma offers a wide range of medicines and healthcare products online. Shop with ease and get them delivered to your doorstep.",
  keywords:
    "pharmacy, online medicine, healthcare products, E Pharma, buy medicine online",
  openGraph: {
    type: "website",
    url: "https://e-pharma-frontend.vercel.app",
    title: "E Pharma - Your Trusted Online Pharmacy",
    description:
      "E Pharma offers a wide range of medicines and healthcare products online. Shop with ease and get them delivered to your doorstep.",
    images: [
      {
        url: "https://i.ibb.co/JnYmBjm/images.png",
        width: 1200,
        height: 630,
        alt: "E Pharma",
      },
    ],
  },
  twitter: {
    site: "@EPharma",
    title: "E Pharma - Your Trusted Online Pharmacy",
    description:
      "E Pharma offers a wide range of medicines and healthcare products online.",
    images: "https://i.ibb.co/JnYmBjm/images.png",
  },
  viewport: "width=device-width, initial-scale=1.0",
};
