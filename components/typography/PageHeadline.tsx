import React from 'react';

export default function PageHeadline({ children }: { children: string }) {
    return (
        <h1 className='text-3xl my-6'>
            {children}
        </h1>
    );
}
