import React from 'react';
import Icon from './Icon';

export default function IconPlusCircle({ size = 24 }: { size?: number }) {
    return (
        <Icon size={size}>
            <svg className='w-full h-full' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path vectorEffect="non-scaling-stroke" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path vectorEffect="non-scaling-stroke" d="M12 8V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path vectorEffect="non-scaling-stroke" d="M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </Icon>
    );
}

