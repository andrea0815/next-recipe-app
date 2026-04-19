import React, { ReactNode } from 'react';

export default function HeatingDetailCard({ label, icon, value }: { label: string, icon: ReactNode, value: any }) {
    return (
        <div className='flex-1 flex flex-col justify-center items-center bg-gray-200 md:px-4 md:max-w-40 pt-2 pb-4 rounded-lg text-center'>

            <div className=' flex justify-center items-center p-4 text-primary'>
                {icon}
            </div>
            <div className='flex-1  w-full flex justify-center items-center'>
                <p className=' w-full md:text-lg leading-[1.1] font-semibold'>
                    {value}
                </p>
            </div>
            <div className='flex items-end mt-4'>
                <p className='text-xs sm:text-sm text-green-400 leading-[1.1]'>{label}</p>
            </div>
        </div>
    );
}
