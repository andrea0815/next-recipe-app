import GeneralSection from "@/components/containers/GeneralSection";
import RecipeGalleryWrapper from "@/components/containers/RecipeGalleryWrapper";
import HeaderTabBar from "@/components/nav/HeaderTabBar";
import HeaderTabBarSkeleton from "@/components/nav/HeaderTabBarSkeleton";
import RecipeListSkeleton from "@/components/recipe/RecipeListSkeleton";
import SearchPanelSkeleton from "@/components/search/SearchPanelSkeleton";
import { RecipeListType } from "@/types/general";

export default function Loading() {
    return (<>
        <HeaderTabBarSkeleton />
        <GeneralSection>
            <RecipeGalleryWrapper>
                <div className='flex flex-col items-center gap-2 w-full'>
                    <SearchPanelSkeleton />
                </div>
                <RecipeListSkeleton />
            </RecipeGalleryWrapper>
        </GeneralSection >
    </>
    );
}