"use server"

import { getCurrentDbUser } from "@/lib/auth/getCurrentDbUser";
import { getCategories } from "@/lib/db/categories";

import type { Category } from '@/types/category';
import type { ListItem } from '@/types/general';

import CategorySection from "./CategorySection";
import NotSignedIn from "@/components/general/NotSignedIn";

export default async function CategorysPage() {
    const user = await getCurrentDbUser();

    if (!user) {
        return <NotSignedIn />
    }

    const categorys: Category[] = await getCategories(undefined, user?.id ?? undefined);

    function prepareCategory(item: Category): ListItem {
        return {
            id: item.id,
            editHref: `/profile/categories/${item.id}/edit`,
            textItems: [
                { key: "name", value: item.name, isOwner: !!item.owner_id },
            ],
        };
    }

    const preparedCategorys: ListItem[] = [...categorys]
        .sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: "base" }))
        .map(prepareCategory);

    return (
        <>
            <CategorySection
                preparedCategories={preparedCategorys}
            />
        </>
    );


}



