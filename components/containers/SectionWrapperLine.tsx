import React from 'react';

export default function SectionWrapper({ children, customClass = "" }: { children: any, customClass?: string }) {
    return (
        <div className={`px-6 py-8 border-2 border-gray-400 rounded-lg ${customClass}`}>
            {children}
        </div>
    );
}
