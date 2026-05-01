import React from 'react';
import Button from '../buttons/Button';
import SectionHeadline from '../typography/SectionHeadline';
import Logo from './Logo';

export default function NotSignedIn() {
    return (
        <div className='flex-1 w-full flex justify-center items-center'>

            <div className='bg-gray-200 py-8 px-10 mb-30  flex flex-col gap-10 rounded-lg max-w-150'>
                <div className='flex flex-col items-center'>
                    <div className='mb-4'>
                        <Logo />
                    </div>
                    <h1 className='font-semibold text-2xl text-center mb-4'>You are not signed in :/</h1>
                    <p className='text-center'>To view this page, please log in or create an account.</p>
                </div>
                <div className="w-full flex flex-col justify-center items-center gap-2">
                    <Button stretch={true} href="/sign-up">Create Account</Button>
                    <Button priority="secondary" stretch={true} href="/sign-in">Login</Button>
                </div>

            </div>
        </div>
    );
}
