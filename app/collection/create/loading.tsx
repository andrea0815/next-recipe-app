import FormSection from '@/components/containers/FormSection';
import GeneralSection from '@/components/containers/GeneralSection';
import HeaderBack from '@/components/nav/HeaderBack';
import RecipeFormSkeleton from '@/components/recipe/RecipeFormSkeleton';

export default function loading() {
    return (
        <>
            <HeaderBack />
            <GeneralSection>
                <FormSection headline="Create Recipe">
                    <RecipeFormSkeleton />
                </FormSection>
            </GeneralSection>
        </>
    );
}
