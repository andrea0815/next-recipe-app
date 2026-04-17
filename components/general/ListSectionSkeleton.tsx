import SectionWrapper from '@/components/containers/SectionWrapper';


export default function ListSectionSkeleton() {

    return (
        <div className="flex flex-col gap-6 w-full items-center flex-1">
            <p className="h-15 w-100 text-center rounded-lg bg-gray-200 animate-pulse"></p>
            <div className='flex flex-col items-center gap-2 w-full'>
                <div
                    className="text-md rounded-xl px-6 h-18.5 flex md:hidden w-full bg-gray-200 animate-pulse"
                ></div>
                <div
                    className="w-40 transition-all text-center justify-center items-center gap-2 fixed z-10 top-6 right-6 md:flex hidden rounded-lg px-4 h-(--btn-h-md) bg-gray-200 animate-pulse"
                ></div>
            </div>
            <SectionWrapper customClass="max-w-200 w-full flex-1 flex flex-col justify-start items-center">
                <div></div>
            </SectionWrapper>
        </div>


    );
}