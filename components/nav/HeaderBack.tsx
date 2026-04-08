import React from 'react';
import HeaderSectionWrapper from '../containers/HeaderSectionWrapper';
import BackButton from '../buttons/BackButton';
import HeaderSectionMax from '../containers/HeaderSectionMax';

export default function HeaderBack() {
    return (
        <HeaderSectionWrapper>
            <HeaderSectionMax>
                <BackButton />
            </HeaderSectionMax>
        </HeaderSectionWrapper>
    );
}
