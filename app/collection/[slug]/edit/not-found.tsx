import NotFoundClient from '@/components/errors/NotFoundClient';
import HeaderRecipeDetail from '@/components/nav/HeaderRecipeDetail';

export default function NotFound() {

    return (<>
        <HeaderRecipeDetail />
        <NotFoundClient />
    </>
    );
}
