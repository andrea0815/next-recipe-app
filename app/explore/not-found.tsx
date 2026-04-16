import NotFoundClient from '@/components/errors/NotFoundClient';
import HeaderTabBar from '@/components/nav/HeaderTabBar';
import { RecipeListType } from '@/types/general';

export default function NotFound() {

    return (<>
        <HeaderTabBar type={RecipeListType.EXPLORE} />
        <NotFoundClient />
    </>
    );
}
