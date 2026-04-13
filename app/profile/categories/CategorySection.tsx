"use client";

import { useState, useRef } from "react";
import { removeCategory } from "@/actions/categories";

import CategoryPanel, { PanelRef } from "@/components/category/CategoryPanel";
import type { CategoryDraft} from "@/types/category";
import type { ListItem } from "@/types/general";
import { FormMode, ItemType } from "@/types/general";

import ListSection from "@/components/general/ListSection";
import PageHeadline from "@/components/typography/PageHeadline";
import ListAddButton from "@/components/general/ListAddButton";

export default function CategorySection({
    preparedCategories,
}: {
    preparedCategories: ListItem[];
}) {
    const [displayed, setDisplayed] = useState<ListItem[]>(preparedCategories);
    const [selectedCategory, setSelectedCategory] = useState<CategoryDraft | null>(null);
    const [panelFormMode, setpanelFormMode] = useState<FormMode>(FormMode.CREATE);
    const CategoryPanelRef = useRef<PanelRef>(null);

    function prepareCategory(item: CategoryDraft): ListItem {
        return {
            id: item.id,
            editHref: `/profile/categories/${item.id}/edit`,
            textItems: [
                { key: "name", value: item.name },
            ],
        };
    }

    return (
        <div className="w-full max-w-200 flex flex-col gap-4">
            <PageHeadline>Categories</PageHeadline>

            <ListAddButton
                type={ItemType.CATEGORY}
                onPress={() => {
                    setpanelFormMode(FormMode.CREATE);
                    setSelectedCategory(null);
                    CategoryPanelRef.current?.open();
                }}
            />

            <ListSection
                items={displayed}
                removeItem={removeCategory}
                type={ItemType.CATEGORY}
                onEditButton={(item) => {
                    setpanelFormMode(FormMode.EDIT);
                    setSelectedCategory({
                        id: item.id,
                        name: item.textItems.find((t) => t.key === "name")?.value || "",
                    });

                    CategoryPanelRef.current?.open();
                }}
            />

            <CategoryPanel
                ref={CategoryPanelRef}
                mode={panelFormMode}
                type={ItemType.CATEGORY}
                initialDraft={{
                    id: selectedCategory?.id || "",
                    name: selectedCategory?.name || "",
                }}
                onCreated={(category) => {
                    setDisplayed((prev) => [...prev, prepareCategory(category)]);
                    setSelectedCategory(category);
                }}
            />
        </div>
    );
}