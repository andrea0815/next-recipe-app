import React from 'react';
import Icon from './Icon';

export default function IconCheck({ size = 24 }: { size?: number }) {
    return (
        <Icon size={size} >
            <svg
                className='w-full h-full'
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
            >
                <path
                    d="M5 13l4 4L19 7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </Icon>
    );
}
