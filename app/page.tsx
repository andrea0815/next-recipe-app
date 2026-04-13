import { SignedOut } from '@clerk/nextjs';

import Button from "@/components/buttons/Button";


export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center">

      <SignedOut>
        <header className="flex flex-col justify-center items-center gap-2">
          <h1 className="text-4xl font-bold mb-2">Welcome to the Recipe Organizer!</h1>
          <h2 className="text-xl mb-10">You are currently not signed in.</h2>

          <div className="w-1/2 flex flex-col justify-center items-center gap-2">
            <Button stretch={true} href="/sign-up">Create Account</Button>
            <Button priority="secondary" stretch={true} href="/sign-in">Login</Button>
          </div>

        </header>
      </SignedOut>

    </div>
  );
}
