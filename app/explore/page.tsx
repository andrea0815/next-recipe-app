import React from 'react';
import UnitList from "@/components/unit/UnitList";
import CategoryList from "@/components/category/CategoryList";
import IngredientList from "@/components/ingredient/IngredientList";

export default function ExplorePage() {
    return (
        <div>
            Explore Page

            <div className="flex mt-10 gap-3">
                <UnitList />
                <CategoryList />
                <IngredientList />
            </div>
        </div>
    );
}
