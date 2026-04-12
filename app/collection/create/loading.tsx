import FormSection from '@/components/containers/FormSection';
import HeaderBack from '@/components/nav/HeaderBack';
import RecipeFormSkeleton from '@/components/recipe/RecipeFormSkeleton';

export default function loading() {
    return (
        <>
            <HeaderBack />
            <FormSection headline="Create Recipe">
                <RecipeFormSkeleton />
            </FormSection>
        </>
    );
}
