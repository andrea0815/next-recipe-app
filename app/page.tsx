import { SignedOut } from '@clerk/nextjs';

import Button from "@/components/buttons/Button";
import Logo from '@/components/general/Logo';

export default function Home() {
  return (
    <div className="w-full flex flex-col flex-1 justify-center items-center bg-gray-100 text-center px-2">

      <SignedOut>
        <header className="flex flex-col justify-center items-center max-w-150 bg-gray-200 gap-2 sm:px-20 px-4 sm:py-10 py-6 rounded-2xl">
          <div className='mb-4'>
            <Logo />
          </div>
          <h1 className="sm:text-4xl text-4xl font-bold mb-4 leading-8 ">Welcome <br /> to Recipeez!</h1>
          <h2 className="sm:text-xl text-lg mb-15 text-green-400">Organize your recipes and explore new ones from your friends!</h2>

          <div className="w-full flex flex-col justify-center items-center gap-2">
            <Button stretch={true} href="/sign-up">Create Account</Button>
            <Button priority="secondary" stretch={true} href="/sign-in">Login</Button>
          </div>

        </header>
      </SignedOut>

    </div>
  );
}
