"use client";

import { useOptimistic } from "react";
import Link from "next/link";
import { removeCategory } from "@/actions/categories";


import type { Category } from '@/types/category';
import Form from "next/form";
import ListItem from "../general/ListItem";


export default function CategoryItems({ categories }: { categories: Category[] }) {

    const [optimisticCategories, setOptimisticCategories] = useOptimistic(
        categories,
        (currentCategories, categoryId) => {
            return currentCategories.filter(category => category.id !== categoryId);
        }
    );

    const removeCategoryById = async (recipeId: string) => {
        setOptimisticCategories(recipeId);
        await removeCategory(recipeId);
    }

    return (
        <ul className="">
            {optimisticCategories.map((category) => (
                <ListItem
                    key={category.id}
                    id={category.id}
                    editHref={`/categorys/${category.id}/edit`}
                    onDeleteAction={removeCategoryById.bind(null, category.id)}
                    textItems={[category.name]}
                />
            ))}
        </ul>
    );
}
