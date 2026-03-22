import TabBar from '@/components/nav/TabBar';
import TabBarItem from '@/components/nav/TabBarItem';
import React from 'react';

export default function ProfileLayout({ children }: { children: any }) {
    return (
        <>
            <nav>
                <TabBar>
                    <TabBarItem href='/profile/account'>Account</TabBarItem>
                    <TabBarItem href='/profile/categories'>Categories</TabBarItem>
                    <TabBarItem href='/profile/units'>Units</TabBarItem>
                    <TabBarItem href='/profile/ingredients'>Ingredients</TabBarItem>
                </TabBar>
            </nav>
            <section>
                {children}
            </section>
        </>
    );
}
