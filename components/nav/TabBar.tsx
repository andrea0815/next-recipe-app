import React, { ReactElement, ReactNode } from 'react';
import TabBarItem from './TabBarItem';
import HeaderSectionWrapper from '../containers/HeaderSectionWrapper';

type TabBarProps = {
    children:
    | ReactElement<typeof TabBarItem>
    | ReactElement<typeof TabBarItem>[];
};

export default function TabBar({ children }: TabBarProps) {
    return (
        <nav className='flex flex-row justify-center items-center w-full overflow-x-scroll no-scrollbar'>
            {children}
        </nav>
    );
}
