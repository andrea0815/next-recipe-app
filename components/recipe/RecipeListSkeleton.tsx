import React from 'react';
import LoaderDots from '../general/LoaderDots';

export default function RecipeListSkeleton({ count = 12 }: { count?: number }) {
    return (
        <div className="w-full flex justify-center items-center">
            <LoaderDots />
        </div>
    );
}
