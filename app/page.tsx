import Image from "next/image";
import Link from "next/link";
import { SignUp, SignedIn, SignOutButton, SignedOut } from '@clerk/nextjs';


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Link href="/sign-in">Sign in</Link>
      <Link href="/sign-up">Sign up</Link>
      <SignOutButton />

      <div>
        <SignedIn>
          <h1>Welcome back!</h1>
        </SignedIn>
        <SignedOut>
          <h1>Please sign in or sign up.</h1>
        </SignedOut>
      </div>
    </div>
  );
}
