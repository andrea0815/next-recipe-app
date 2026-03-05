import Image from "next/image";
import Link from "next/link";
import { SignUp, SignedIn, SignOutButton, SignedOut } from '@clerk/nextjs';
import Navbar from "@/components/Navbar";


export default function Home() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        Thats my shopping list
      </div>
    </>
  );
}
