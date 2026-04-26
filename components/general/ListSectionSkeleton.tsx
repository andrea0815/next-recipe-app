import SectionWrapper from '@/components/containers/SectionWrapper';
import LoaderDots from './LoaderDots';


export default function ListSectionSkeleton() {

    return (
        <div className="flex flex-col gap-6 w-full items-center flex-1 min-h-200">
            <SectionWrapper customClass="max-w-200 w-full flex-1 flex flex-col justify-start items-center ">
                <div className='mt-10'>
                    <LoaderDots />
                </div>
            </SectionWrapper>
        </div>


    );
}