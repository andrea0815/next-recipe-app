import React from 'react';

export default function PageHeadline({ children }: { children: string }) {
    return (
        <h1 className='text-3xl mb-3'>
            {children}
        </h1>
    );
}
