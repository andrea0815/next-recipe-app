import React, { ReactElement, ReactNode } from 'react';
import TabBarItem from './TabBarItem';

type TabBarProps = {
    children:
    | ReactElement<typeof TabBarItem>
    | ReactElement<typeof TabBarItem>[];
};

export default function TabBar({ children }: TabBarProps) {
    return (
        <nav className='w-full h-10 mt-[200px] flex flex-row justify-center items-center border-b-2 border-solid border-text'>
            {children}
        </nav>
    );
}
