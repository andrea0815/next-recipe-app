import React from 'react';
import {
    UserProfile
} from "@clerk/nextjs";

export default function ProfileSettingsPage() {
    return (
        <div className='h-dvh flex justify-center items-center'>
            <UserProfile path='/profile/account/settings' />
        </div>
    );
}
