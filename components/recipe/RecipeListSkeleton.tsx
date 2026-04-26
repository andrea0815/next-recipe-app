import React from 'react';
import LoaderDots from '../general/LoaderDots';

export default function RecipeListSkeleton({ count = 12 }: { count?: number }) {
    return (
        <div className="w-full grid grid-cols-1 gap-3 md:grid-cols-3 lg:grid-cols-4">
            {/* {Array.from({ length: count }, (_, index) => (
                <div
                    key={index}
                    className="aspect-2/3 w-full rounded-xl bg-gray-300 animate-pulse"
                />
            ))} */}
            <LoaderDots />
        </div>
    );
}
