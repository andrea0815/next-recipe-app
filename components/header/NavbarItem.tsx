import Link from 'next/link';
import React from 'react';

export default function NavbarItem({ link, iconSrc, text }: { link: string, iconSrc: string, text: string }) {
    return (
        <Link href={link}>
            <div className='flex items-center gap-3 px-3 py-2 hover:bg-green-400 rounded-full'>
                <img src={iconSrc} alt={text} className='w-5 h-5' />
                <p>{text}</p>
            </div>
        </Link>
    );
}
