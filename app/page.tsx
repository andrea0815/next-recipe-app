import Image from "next/image";
import Link from "next/link";
import { SignUp, SignedIn, SignOutButton, SignedOut } from '@clerk/nextjs';
import RecipeList from "@/components/RecipeList";


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">


      <div className="flex flex-col">
        <SignedIn>
          <Link href="/user-profile" className="text-[var(--foreground)] hover:text-[var(--primary)]">
            Profile
          </Link>
          <SignOutButton><button>Sign out</button></SignOutButton>
          <h1>Welcome back!</h1>
          <Link href="/shopping-list">Go to your shopping list</Link>
          <Link href="/create-recipe">Create a new recipe</Link>

          <div>
            <RecipeList />
          </div>
        </SignedIn>

        <SignedOut>
          <Link href="/sign-in">Sign in</Link>
          <Link href="/sign-up">Sign up</Link>
          <h1>You are currently not signed in.</h1>
        </SignedOut>
      </div>
    </div>
  );
}
