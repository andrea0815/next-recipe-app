import Button from '@/components/buttons/Button';
import ButtonLink from '@/components/buttons/ButtonLink';
import GeneralSection from '@/components/containers/GeneralSection';
import PageHeadline from '@/components/typography/PageHeadline';
import { SignInButton, SignOutButton } from '@clerk/nextjs';
import Link from 'next/link';
import React from 'react';

export default function ProfileAccountPage() {
    return (
        <GeneralSection>
            <PageHeadline>Account</PageHeadline>
            <div className='flex flex-col gap-4'>
                <ButtonLink isPrimary={false} link="/profile/settings/account" text='Account Settings' />
                <SignOutButton>
                    <Button bgColor='red'>Sign out</Button>
                </SignOutButton>
            </div>
        </GeneralSection>
    );
}
