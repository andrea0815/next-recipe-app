import React from 'react';

export default function SectionHeadline({ children }: { children: string }) {
    return (
        <h2 className='text-xl my-4'>
            {children}
        </h2>
    );
}
