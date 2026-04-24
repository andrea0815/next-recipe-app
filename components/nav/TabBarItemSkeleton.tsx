import React from 'react';

export default function TabBarItemSkeleton() {
    return (
        <div className='px-4 py-4 text-sm whitespace-nowrap cursor-pointer'>
            <div className="h-5 w-12.5 shrink-0 rounded-full bg-gray-200 animate-pulse" />
        </div>
    );
}
