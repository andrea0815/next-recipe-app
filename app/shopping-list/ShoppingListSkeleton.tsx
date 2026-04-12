import SectionWrapper from '@/components/containers/SectionWrapper';


export default function ShoppingListSkeleton() {

    return (
        <div className="flex flex-col gap-6 w-full items-center flex-1">
            <p className="h-15 w-100 text-center rounded-lg bg-gray-200 animate-pulse"></p>
            <SectionWrapper customClass="max-w-200 w-full flex-1 flex flex-col justify-start items-center">
                <div></div>
            </SectionWrapper>
        </div>


    );
}