import GeneralSection from "@/components/containers/GeneralSection";
import RecipeGalleryWrapper from "@/components/containers/RecipeGalleryWrapper";
import HeaderTabBar from "@/components/nav/HeaderTabBar";
import RecipeListSkeleton from "@/components/recipe/RecipeListSkeleton";
import SearchPanelSkeleton from "@/components/search/SearchPanelSkeleton";
import { RecipeListType } from "@/types/general";

export default function Loading() {
    return (<>
        <HeaderTabBar type={RecipeListType.COLLECTION} />
        <GeneralSection>
            <RecipeGalleryWrapper>
                <div className='flex flex-col items-center gap-2 w-full'>
                    <div
                        className="text-md rounded-xl px-6 h-18.5 flex md:hidden w-full bg-gray-200 animate-pulse"
                    ></div>
                    <div
                        className="w-40 transition-all text-center justify-center items-center gap-2 fixed z-10 top-6 right-6 md:flex hidden rounded-lg px-4 h-(--btn-h-md) bg-gray-200 animate-pulse"
                    ></div>
                    <SearchPanelSkeleton />
                </div>
                <RecipeListSkeleton />
            </RecipeGalleryWrapper>
        </GeneralSection >
    </>
    );
}