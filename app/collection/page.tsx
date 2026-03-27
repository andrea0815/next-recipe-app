import RecipeList from '@/components/recipe/RecipeList';
import ButtonLink from '@/components/buttons/ButtonLink';

export default function CollectionPage() {
    return (
        <div className='flex flex-col gap-6'>
            <ButtonLink link='/collection/create' text='Create new Recipe' />
            <RecipeList />
        </div>
    );
}
