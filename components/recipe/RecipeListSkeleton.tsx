import React from 'react';

export default function RecipeListSkeleton({ count = 12 }: { count?: number }) {
    return (
        <div className="gap-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {Array({ length: count }).map((_, index) => (
                <div key={index} className="h-70 w-full rounded-xl bg-gray-200 animate-pulse" />
            ))}
        </div>
    );
}
