import SectionWrapper from "@/components/containers/SectionWrapper";
import PageHeadline from "@/components/typography/PageHeadline";
import ShoppingList from "@/components/shoppinglist/ShoppingList";
import { ShoppingItem } from "@/types/shoppingList";
import LoaderDots from "@/components/general/LoaderDots";
import ShoppingListSkeleton from "@/components/shoppinglist/ShoppingListSkeleton";

export default function ShoppingListSectionSkeleton() {
    return (
        <div className="flex flex-col gap-2 w-full items-center flex-1">
            <PageHeadline>Shopping List</PageHeadline>
            <SectionWrapper customClass="max-w-200 w-full flex-1 flex flex-col justify-start items-center ">
                <ShoppingListSkeleton />
            </SectionWrapper>
        </div>
    );
}
