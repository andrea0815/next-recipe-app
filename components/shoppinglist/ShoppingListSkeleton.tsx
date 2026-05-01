import SectionWrapper from '@/components/containers/SectionWrapper';
import Button from '../buttons/Button';
import IconSpinner from '../icons/IconSpinner';
import LoaderDots from '../general/LoaderDots';


export default function ShoppingListSkeleton() {

    return (
        <div className="flex flex-col gap-6 w-full items-center flex-1">

            <div className="w-full flex gap-2 justify-between">
                <Button
                    priority="tertiary"
                    type="button"
                    customClass="py-0 px-0"
                >
                    Mark all
                </Button>

                <Button
                    priority="secondary"
                    type="submit"
                    disabled={true}
                >
                    Remove items
                </Button>
            </div>

            <p className="h-15 w-50 text-center rounded-lg bg-gray-200 animate-pulse"></p>
            <SectionWrapper customClass="max-w-200 w-full flex-1 flex flex-col justify-start items-center">
               <LoaderDots />
            </SectionWrapper>
        </div>


    );
}