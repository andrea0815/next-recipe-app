import React, { ReactNode } from 'react';

export default function GeneralSection({ children }: { children: any }
) {
  return (
    <div className='mt-6 mb-10 w-full px-6'>
      {children}
    </div>
  );
}
