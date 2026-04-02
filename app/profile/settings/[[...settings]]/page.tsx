import Button from '@/components/buttons/Button';
import PageHeadline from '@/components/typography/PageHeadline';
import { SignInButton, SignOutButton } from '@clerk/nextjs';
import {
    UserProfile
} from "@clerk/nextjs";
import Link from 'next/link';
import React from 'react';

export default function ProfileAccountPage() {
    return (
        <>
            <PageHeadline>Settings</PageHeadline>
            <div className='flex flex-col justify-center items-center gap-4'>
                <div className='py-10'>
                    <UserProfile path='/profile/settings'/>
                </div>
                <SignOutButton>
                    <Button color='red w-full'>Sign out</Button>
                </SignOutButton>
            </div>
        </>
    );
}
