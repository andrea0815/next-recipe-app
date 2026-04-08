import React from 'react';

export default function HeaderSectionMax( {children}:  {children: any}) {
    return (
        <div className='w-full lg:px-10 md:px-6 px-3 flex items-center justify-between'>
            {children}
        </div>
    );
}
