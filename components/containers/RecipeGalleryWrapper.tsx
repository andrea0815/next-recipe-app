import React from 'react';

export default function RecipeGalleryWrapper({ children }: { children: any }
) {
    return (
        <div className='flex flex-col items-center gap-6 w-full'>
            {children}
        </div>
    );
}
