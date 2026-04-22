import HeaderSectionWrapper from '../containers/HeaderSectionWrapper';
import Button from '../buttons/Button';
import BackButton from '../buttons/BackButton';
import DeleteButton from '../buttons/DeleteButton';


export default function HeaderRecipeDetailSkeleton({ isOwner }: { isOwner: boolean }) {

    return (
        <HeaderSectionWrapper>
            <div className='lg:px-10 md:px-6 px-3 mb-2 w-full flex items-center justify-between'>
                <BackButton />

                {isOwner &&
                    <div className='flex gap-2'>
                        <Button
                            priority='secondary'
                            size='small'
                        >Edit</Button>
                        <DeleteButton itemId={""} />
                    </div>
                }
            </div>
        </HeaderSectionWrapper>
    );
}
