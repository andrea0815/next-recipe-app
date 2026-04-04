"use client"
import React from 'react';
import Switch from '@/components/form/Switch';

export default function ProfileSettings() {

    const onPublicChange = () => {
        
    }

    return (
        <ul className='w-full border-t border-gray-300'>
            <li className='py-3 flex justify-between items-center w-full border-b border-gray-300'>

                <p>Recipes are public by default:</p>
                <Switch
                    checked={true}
                    name="is_public"
                    onChange={(checked) => console.log("check", checked)}
                />
            </li>
        </ul>
    );
}
