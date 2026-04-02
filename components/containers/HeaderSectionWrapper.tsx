import React from 'react';

export default function HeaderSectionWrapper({ children }: { children?: any }) {
    return (
        <nav className='w-full h-[140px] flex items-end justify-center border-b border-solid border-gray-400'>
            {children}
        </nav>
    );
}
