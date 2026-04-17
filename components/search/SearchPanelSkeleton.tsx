"use client"

export default function SearchPanelSkeleton() {
    return (
        <div className='relative h-20 w-full sm:my-5 flex justify-center items-start'>
            <div className='absolute left-1/2 top-0 -translate-x-1/2 z-5 flex flex-col justify-start items-center rounded-xl w-full max-w-150'>
                <div className="flex h-18.5 gap-2 w-full p-3 rounded-xl bg-gray-200 animate-pulse"></div>
            </div>
        </div>
    );
}
