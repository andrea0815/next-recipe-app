import TabBar from '@/components/nav/TabBar';
import TabBarItem from '@/components/nav/TabBarItem';
import React from 'react';

export default function ProfileLayout({ children }: { children: any }) {
    return (
        <>
            <TabBar>
                <TabBarItem href='/profile/settings'>Settings</TabBarItem>
                <TabBarItem href='/profile/categories'>Categories</TabBarItem>
                <TabBarItem href='/profile/units'>Units</TabBarItem>
                <TabBarItem href='/profile/ingredients'>Ingredients</TabBarItem>
            </TabBar>
            <section className='w-full px-10'>
                {children}
            </section>
        </>
    );
}
