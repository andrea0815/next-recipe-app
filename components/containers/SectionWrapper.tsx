import React from 'react';

export default function SectionWrapper({ children }: { children: any }) {
    return (
        <div className='px-6 py-8 bg-section rounded-lg'>
            {children}
        </div>
    );
}
