"use client"

import HeaderSectionWrapper from '../containers/HeaderSectionWrapper';
import Button from '../buttons/Button';
import BackButton from '../buttons/BackButton';
import DeleteButton from '../buttons/DeleteButton';
import HeaderSectionMax from '../containers/HeaderSectionMax';
import { usePathname } from 'next/navigation';
import { getCurrentDbUser } from '@/lib/auth/getCurrentDbUser';
import { getRecipeById } from '@/lib/db/recipes';

export default function HeaderRecipeDetail({ recipeId }: { recipeId: string }) {

    const pathname = usePathname();

    return (
        <HeaderSectionWrapper>
            <div className='lg:px-10 md:px-6 px-3 mb-2 w-full flex items-center justify-between'>
                <BackButton />
                <div className='flex gap-2'>
                    <Button
                        href={`${pathname}/edit`}
                        priority='secondary'
                        size='small'
                    >Edit</Button>
                    <DeleteButton itemId={recipeId} />
                </div>
            </div>
        </HeaderSectionWrapper>
    );
}
