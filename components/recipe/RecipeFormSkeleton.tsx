import SectionWrapper from '../containers/SectionWrapper';
import LoaderDots from '../general/LoaderDots';
import IconSpinner from '../icons/IconSpinner';
import SectionHeadline from '../typography/SectionHeadline';

export default function RecipeFormSkeleton() {

    return (
        <>
            <div
                className='w-full max-w-200 flex flex-col gap-4 justify-center items-center'
            >
                <SectionWrapper customClass='w-full h-200 max-w-200 flex flex-col gap-4 bg-gray-200 animate-pulse justify-start items-center'>
                    <div className='my-20'>
                        <LoaderDots />
                    </div>
                </SectionWrapper>

                <SectionWrapper customClass='w-full h-200 max-w-200 flex flex-col gap-4 bg-gray-200 animate-pulse'>
                    <div></div>
                </SectionWrapper>

                <SectionWrapper customClass='w-full h-100 max-w-200 flex flex-col gap-4 bg-gray-200 animate-pulse'>
                    <div></div>
                </SectionWrapper>

                <div className='h-20 w-100 rounded-lg bg-gray-200 animate-pulse'></div>
            </div >

        </>
    );
}
