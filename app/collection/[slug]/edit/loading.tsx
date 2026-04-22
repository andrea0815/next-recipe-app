import FormSection from "@/components/containers/FormSection";
import GeneralSection from "@/components/containers/GeneralSection";
import RecipeGalleryWrapper from "@/components/containers/RecipeGalleryWrapper";
import HeaderBack from "@/components/nav/HeaderBack";
import HeaderTabBar from "@/components/nav/HeaderTabBar";
import RecipeFormSkeleton from "@/components/recipe/RecipeFormSkeleton";
import RecipeListSkeleton from "@/components/recipe/RecipeListSkeleton";
import SearchPanelSkeleton from "@/components/search/SearchPanelSkeleton";
import { RecipeListType } from "@/types/general";

export default function Loading() {
    return (<>
        <HeaderBack />
        <GeneralSection>
            <FormSection headline="Edit Recipe">
                <RecipeFormSkeleton />
            </FormSection>
        </GeneralSection>
    </>
    );
}