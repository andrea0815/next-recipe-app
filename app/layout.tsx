import type { Metadata } from "next";
import { ClerkProvider, SignedIn } from '@clerk/nextjs'
import { Recursive } from "next/font/google";
import "./globals.css";

import Header from "@/components/nav/Header";
import Footer from "@/components/footer/Footer";
import ToastProvider from "@/components/general/ToastProvider";

const recursive = Recursive({
  variable: "--font-recursive",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://recipeez.com"),

  title: {
    default: "Recipeez | Recipe Organizer",
    template: "%s | Recipeez",
  },

  description:
    "A website for organizing your recipes and sharing them with friends. A personal project created by Andrea Windisch.",

  applicationName: "Recipeez",
  keywords: ["recipes", "cooking", "meal planning", "recipe manager"],
  authors: [{ name: "Andrea Windisch" }],
  creator: "Andrea Windisch",
  publisher: "Andrea Windisch",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    url: "/",
    siteName: "Recipeez",
    title: "Recipeez",
    description:
      "Organize your recipes and share them with friends.",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Recipeez",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Recipeez",
    description:
      "Organize your recipes and share them with friends.",
    images: ["/twitter-image.png"],
  },

  robots: {
    index: false,
    follow: false,
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="no-scrollbar">
        <body
          className={`${recursive.variable} text-text antialiased bg-greay-100 min-h-screen flex flex-col justify-between no-scrollbar`}
        >
          <SignedIn>
            <Header />
          </SignedIn>
          <main className="flex flex-col justify-start items-center flex-1 no-scrollbar">
            {children}
          </main>
          <ToastProvider />
        </body>
      </html>
    </ClerkProvider>
  );
}
