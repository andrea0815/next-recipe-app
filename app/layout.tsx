import type { Metadata } from "next";
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/nextjs'
import { Recursive } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/nav/Navbar";
import Link from "next/link";
import Header from "@/components/nav/Header";
import Footer from "@/components/footer/Footer";

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
      <html lang="en">
        <body
          className={`${recursive.variable} text-text antialiased bg-greay-100 min-h-screen flex flex-col justify-between`}
        >
          <SignedIn>
            <Header />
          </SignedIn>
          <SignedOut>
            <header>
              <Link href="/sign-in">Sign in</Link>
              <Link href="/sign-up">Sign up</Link>
              <h1>You are currently not signed in.</h1>
            </header>
          </SignedOut>
          <main className="flex flex-col justify-start items-center flex-1">
            {children} 
          </main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
