"use client";

import { useOptimistic } from "react";

import type { Category } from '@/types/category';

export default function CategoryItems({ categories }: { categories: Category[] }) {

    const [optimisticCategories, setOptimisticCategories] = useOptimistic(
        categories,
        (currentCategories, categoryId) => {
            return currentCategories.filter(category => category.id !== categoryId);
        }
    );

    return (
        <div>
            <h2 className="text-md font-bold">Categories</h2>
            <ul className="">
                {optimisticCategories.map((category) => (
                    <li
                        key={category.id}
                        className=""
                    >
                        <p className="text-sm">
                            {category.name}
                        </p>

                    </li>
                ))}
            </ul>
        </div>
    );
}
