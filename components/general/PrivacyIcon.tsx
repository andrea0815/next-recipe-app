import React from 'react';
import IconLock from '../icons/IconLock';
import IconGlobe from '../icons/IconGlobe';
import Tag from './Tag';

export default function PrivacyIcon({ isPublic }: { isPublic: boolean }) {

    const text = isPublic ? "public" : "private"

    return (
        <div
            title={isPublic ? "Public Recipe" : "Private Recipe"}
            className="group/visibility text-primary absolute top-2 right-2 text-xs flex items-center bg-white/75 rounded-full p-1 overflow-hidden cursor-pointer"
        >
            <p
                className="
      w-0
      max-w-0
      opacity-0
      whitespace-nowrap
      overflow-hidden
      transition-all
      duration-300
      -translate-x-1
      group-hover/visibility:w-12
      group-hover/visibility:max-w-20
      group-hover/visibility:opacity-100
      group-hover/visibility:translate-x-0
    "
            ><span className=' mx-2'>
                    {text}
                </span>
            </p>
            {isPublic ? <IconGlobe size={16} /> : <IconLock size={16} />}
        </div>
    );
}
