import React from 'react';

export default function SectionWrapper({ children, customClass = "" }: { children: any, customClass?: string }) {
    return (
        <div className={`lg:px-10 md:px-6 px-2 sm:py-6 py-4 bg-section rounded-lg ${customClass}`}>
            {children}
        </div>
    );
}
