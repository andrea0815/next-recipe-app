import { SignIn } from '@clerk/nextjs';
import React from 'react';

export default function SignInPage() {
  return (
    <div className='h-dvh flex justify-center items-center'>
      <SignIn />
    </div>
  );
}
