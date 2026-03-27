"use client"

import Link from 'next/link';
import React from 'react';
import { usePathname } from "next/navigation";


export default function NavbarItem({ link, iconSrc, text }: { link: string, iconSrc: string, text: string }) {

    const pathname = usePathname();
    const isActive = pathname.startsWith(link);
    
    return (
        <Link href={link}>
            <div className={`flex items-center gap-3 px-3 py-2 hover:bg-gray-300 rounded-full ${isActive ? "bg-gray-200" : ""} `}>
                <img src={iconSrc} alt={text} className='w-5 h-5' />
                <p>{text}</p>
            </div>
        </Link>
    );
}
