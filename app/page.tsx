import { SignedOut } from '@clerk/nextjs';

import Button from "@/components/buttons/Button";

export default function Home() {
  return (
    <div className="w-full flex flex-col flex-1 justify-center items-center bg-gray-300 text-center px-2">

      <SignedOut>
        <header className=" flex flex-col justify-center items-center gap-2 sm:px-20 px-4 sm:py-10 py-6 rounded-2xl bg-white">
          <h1 className="sm:text-4xl text-3xl font-bold mb-2 ">Welcome <br /> to Recipeez!</h1>
          <h2 className="sm:text-xl text-lg mb-15 text-green-400">You are currently not signed in.</h2>

          <div className="w-full flex flex-col justify-center items-center gap-2">
            <Button stretch={true} href="/sign-up">Create Account</Button>
            <Button priority="secondary" stretch={true} href="/sign-in">Login</Button>
          </div>

        </header>
      </SignedOut>

    </div>
  );
}
