import type { Metadata } from "next";
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/nextjs'
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/header/Navbar";
import Link from "next/link";
import Header from "@/components/header/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
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
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
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
          <main>
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
