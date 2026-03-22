import React, { ReactElement, ReactNode } from 'react';
import TabBarItem from './TabBarItem';

type TabBarProps = {
    children:
    | ReactElement<typeof TabBarItem>
    | ReactElement<typeof TabBarItem>[];
};

export default function TabBar({ children }: TabBarProps) {
    return (
        <div className='h-10 flex flex-row justify-center items-center'>
            {children}
        </div>
    );
}
