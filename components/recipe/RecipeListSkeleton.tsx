import React from 'react';

export default function RecipeListSkeleton({ count = 12 }: { count?: number }) {
    return (
        <div className="w-full grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: count }, (_, index) => (
                <div
                    key={index}
                    className="aspect-2/3 w-full rounded-xl bg-gray-300 animate-pulse"
                />
            ))}
        </div>
    );
}
