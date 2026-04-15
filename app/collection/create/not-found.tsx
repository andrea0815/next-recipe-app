import NotFoundClient from '@/components/errors/NotFoundClient';
import HeaderBack from '@/components/nav/HeaderBack';
import HeaderRecipeDetail from '@/components/nav/HeaderRecipeDetail';

export default function NotFound() {

    return (<>
        <HeaderBack />
        <NotFoundClient />
    </>
    );
}
