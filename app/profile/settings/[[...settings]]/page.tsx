import Button from '@/components/buttons/Button';
import PageHeadline from '@/components/typography/PageHeadline';
import { getCurrentDbUser } from '@/lib/auth/getCurrentDbUser';
import { SignInButton, SignOutButton } from '@clerk/nextjs';
import {
    UserProfile
} from "@clerk/nextjs";
import Link from 'next/link';
import React from 'react';
import ProfileSettings from './ProfileSettings';

export default async function ProfileAccountPage() {

    const user = await getCurrentDbUser();
    console.log(user);

    return (
        <>
            <PageHeadline>Settings</PageHeadline>
            <div className='flex flex-col justify-center items-center gap-4 mt-6'>

                <ProfileSettings />

                <div className='py-6'>
                    <UserProfile path='/profile/settings' />
                </div>
                <SignOutButton>
                    <Button
                        color='red'
                        stretch={true}
                        customClass='w-full'
                    >Sign out</Button>
                </SignOutButton>
            </div>
        </>
    );
}
