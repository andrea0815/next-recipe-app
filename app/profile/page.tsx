import React from 'react';
import {
    UserProfile
} from "@clerk/nextjs";

export default function ProfilePage() {
    return (
        <div className='h-dvh flex justify-center items-center'>
            <UserProfile path='/profile' />
        </div>
    );
}
