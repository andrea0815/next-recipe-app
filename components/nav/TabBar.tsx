import React, { ReactElement, ReactNode } from 'react';
import TabBarItem from './TabBarItem';
import HeaderSectionWrapper from '../containers/HeaderSectionWrapper';

type TabBarProps = {
    children:
    | ReactElement<typeof TabBarItem>
    | any;
};

export default function TabBar({ children }: TabBarProps) {
    return (
        <nav className="w-full overflow-x-auto no-scrollbar px-2">
            <div className="flex w-max mx-auto">
                {children}
            </div>
        </nav>
    );
}
