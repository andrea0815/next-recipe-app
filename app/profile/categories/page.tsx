"use server"

import { removeCategory } from "@/actions/categories";
import { getCurrentDbUser } from "@/lib/auth/getCurrentDbUser";
import { getCategories } from "@/lib/db/categories";

import type { Category } from '@/types/category';

import { ItemType } from "@/types/general"
import ListSection from '@/components/general/ListSection';
import PageHeadline from "@/components/typography/PageHeadline";
import GeneralSection from "@/components/containers/GeneralSection";


export default async function CategoriesPage() {
    const user = await getCurrentDbUser();
    const categories: Category[] = await getCategories(undefined, user?.id ?? undefined);

    const preparedCategories = categories.map((item) => ({
        id: item.id,
        editHref: `/profile/categories/${item.id}/edit`,
        textItems: [item.name],
    }));

    return (
        <>
            <PageHeadline>Categories</PageHeadline>
            <ListSection items={preparedCategories} removeItem={removeCategory} type={ItemType.CATEGORY} />
        </>

    );
}

