import type { Metadata } from "next";
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/nextjs'
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
  title: "Recipe Organizer",
  description: "created by Andrea Windisch",
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
          <Header />
          <main className="flex flex-col justify-start items-center flex-1 no-scrollbar">
            {children}
          </main>
          <Footer />
          <ToastProvider />
        </body>
      </html>
    </ClerkProvider>
  );
}
