import React from 'react';

export default function PageHeadline({ children }: { children: string }) {
    return (
        <h1 className='text-3xl mt-6 mb-10'>
            {children}
        </h1>
    );
}
