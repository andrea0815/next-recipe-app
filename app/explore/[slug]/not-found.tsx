import NotFoundClient from '@/components/errors/NotFoundClient';
import HeaderRecipeDetail from '@/components/nav/HeaderRecipeDetail';
import { RecipeListType } from '@/types/general';

export default function NotFound() {

    return (<>
        <HeaderRecipeDetail mode={RecipeListType.EXPLORE} />
        <NotFoundClient />
    </>
    );
}
