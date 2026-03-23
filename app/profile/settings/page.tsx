import Button from '@/components/buttons/Button';
import { SignInButton, SignOutButton } from '@clerk/nextjs';
import Link from 'next/link';
import React from 'react';

export default function ProfileAccountPage() {
    return (
        <div className='h-dvh flex justify-center items-center'>
            Account
            <Link href="/profile/settings/account">Settings</Link>
            <SignOutButton>
                <Button text="Sign out"/>
            </SignOutButton>
        </div>
    );
}
