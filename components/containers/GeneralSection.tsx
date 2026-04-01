import React, { ReactNode } from 'react';

export default function GeneralSection({ children }: { children: any }
) {
  return (
    <div className='mt-6 lg:px-10 md:px-6 px-3 mb-10 w-full '>
      {children}
    </div>
  );
}
