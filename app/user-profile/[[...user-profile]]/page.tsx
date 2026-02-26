import React from 'react';
import {
    UserProfile
} from "@clerk/nextjs";

export default function UserProfilePage() {
    return (
        <div className='h-dvh flex justify-center items-center'>
            <UserProfile path='/user-profile' />
        </div>
    );
}
