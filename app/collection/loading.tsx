import Button from "@/components/buttons/Button";
import GeneralSection from "@/components/containers/GeneralSection";
import RecipeGalleryWrapper from "@/components/containers/RecipeGalleryWrapper";
import IconAdd from "@/components/icons/IconAdd";
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
                <div className="flex flex-col items-center gap-4 w-full">
                    <Button
                        href="/collection/create"
                        customClass="flex md:hidden w-full"
                        size="huge"
                    >
                        <IconAdd /> Create new Recipe
                    </Button>

                    <Button
                        href="/collection/create"
                        customClass="fixed z-10 top-6 right-6 w-fit md:flex hidden"
                    >
                        <IconAdd /> Create new Recipe
                    </Button>

                    <SearchPanelSkeleton />
                </div>
                <RecipeListSkeleton />
            </RecipeGalleryWrapper>
        </GeneralSection>
    </>
    );
}