import React from 'react';

export default function SectionWrapper({ children, customClass = "" }: { children: any, customClass?: string }) {
    return (
        <div className={`lg:px-10 md:px-6 px-3 py-8 bg-section rounded-lg ${customClass}`}>
            {children}
        </div>
    );
}
