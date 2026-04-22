import React from 'react';
import HeaderSectionWrapper from '../containers/HeaderSectionWrapper';
import BackButton from '../buttons/BackButton';
import HeaderSectionMax from '../containers/HeaderSectionMax';

export default function HeaderBack({ href }: { href?: string }) {
    return (
        <HeaderSectionWrapper>
            <div className='lg:px-10 md:px-6 px-3 mb-2 w-full flex items-center justify-between'>
                <BackButton href={href ?? null} />
            </div>
        </HeaderSectionWrapper>
    );
}
