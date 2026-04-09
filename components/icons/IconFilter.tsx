import React from 'react';
import Icon from './Icon';

export default function IconFilter({ size = 24 }: { size?: number }) {
    return (
        <Icon size={size}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.5 2.25L1.5 2.25L7.5 9.345L7.5 14.25L10.5 15.75L10.5 9.345L16.5 2.25Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </Icon>
    );
}

