import NotFoundClient from '@/components/errors/NotFoundClient';
import TabBar from '@/components/nav/TabBar';
import HeaderSectionWrapper from '@/components/containers/HeaderSectionWrapper';
import TabBarItem from '@/components/nav/TabBarItem';

export default function NotFound() {

    return (<>
        <HeaderSectionWrapper>
            <TabBar>
                <TabBarItem href='/profile/settings' text='Settings' />
                <TabBarItem href='/profile/categories' text='Categories' />
                <TabBarItem href='/profile/units' text='Units' />
                <TabBarItem href='/profile/ingredients' text='Ingredients' />
            </TabBar>
        </HeaderSectionWrapper>
        <NotFoundClient />
    </>
    );
}
