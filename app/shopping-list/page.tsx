import Image from "next/image";
import Link from "next/link";
import { SignUp, SignedIn, SignOutButton, SignedOut } from '@clerk/nextjs';


export default function Home() {
  return (
    <>
      <div className="flex flex-col min-h-screen items-center justify-center">
        Thats my shopping list
      </div>
    </>
  );
}
