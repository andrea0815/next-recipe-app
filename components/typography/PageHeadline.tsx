import React from 'react';

export default function PageHeadline({ children }: { children: string }) {
    return (
        <h1 className='sm:text-3xl text-2xl sm:mt-6 mt-0 sm:mb-10 mb-4'>
            {children}
        </h1>
    );
}
