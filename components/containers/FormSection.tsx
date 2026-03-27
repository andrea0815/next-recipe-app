import React from 'react';
import SectionWrapper from './SectionWrapper';
import PageHeadline from '../typography/PageHeadline';

export default function FormSection({ children, headline }: { children: any, headline: string }) {
    return (
        <div className='w-full flex justify-center items-center'>
            <div className='w-200 flex flex-col gap-4'>
                <PageHeadline>{headline}</PageHeadline>
                <SectionWrapper>
                    {children}
                </SectionWrapper>
            </div>
        </div>
    );
}
