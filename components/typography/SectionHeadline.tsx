import React from 'react';

export default function SectionHeadline({ children }: { children: string }) {
    return (
        <h2 className='text-xl font-semibold text-left mb-4'>
            {children}
        </h2>
    );
}
