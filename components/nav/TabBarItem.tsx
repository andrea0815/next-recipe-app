import Link from 'next/link';
import React from 'react';

type TabBarItemProps = {
    children: any,
    href: string
}

export default function TabBarItem({ children, href }: TabBarItemProps) {
    return (
        <Link href={href} className='px-4'>
            {children}
        </Link>
    );
}
