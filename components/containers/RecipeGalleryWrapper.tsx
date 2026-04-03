import React from 'react';

export default function RecipeGalleryWrapper({ children }: { children: any }
) {
    return (
        <div className='flex flex-col gap-6 w-full'>
            {children}
        </div>
    );
}
