"use client";

import { ItemType } from "@/types/general";

import PageHeadline from "@/components/typography/PageHeadline";
import ListAddButton from "@/components/general/ListAddButton";
import ListSectionSkeleton from "@/components/general/ListSectionSkeleton";

export default function CategorySectionSkeleton() {

    return (
        <div className="w-full max-w-200 flex flex-col items-center">
            <PageHeadline>Categories</PageHeadline>
            <ListAddButton
                type={ItemType.CATEGORY}
                onPress={() => null}
            />

            <ListSectionSkeleton
            />
        </div>
    )
}