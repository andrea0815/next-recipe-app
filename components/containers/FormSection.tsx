import React from 'react';
import SectionWrapper from './SectionWrapper';
import PageHeadline from '../typography/PageHeadline';

export default function FormSection({ children, headline }: { children: any, headline: string }) {
    return (
        <div className='w-full flex flex-col justify-center items-center'>
            <PageHeadline>{headline}</PageHeadline>
            {children}
        </div>
    );
}
