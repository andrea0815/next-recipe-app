import React from 'react';
import HeaderSectionWrapper from '../containers/HeaderSectionWrapper';
import Button from '../buttons/Button';
import BackButton from '../buttons/BackButton';
import DeleteButton from '../buttons/DeleteButton';
import HeaderSectionMax from '../containers/HeaderSectionMax';

export default function HeaderRecipeDetail() {
    return (
        <HeaderSectionWrapper>
            <HeaderSectionMax>
                <BackButton />
                <div className='flex gap-2'>
                    <Button
                        href="/collection/edit"
                        priority='secondary'
                        size='small'
                    >Edit</Button>
                    <DeleteButton itemId='' />
                </div>
            </HeaderSectionMax>
        </HeaderSectionWrapper>
    );
}
