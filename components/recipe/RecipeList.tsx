import type { RecipeListItem } from '@/types/recipe';
import RecipeCard from "./RecipeCard";
import { RecipeListType } from '@/types/general';


export default function RecipeList({ recipes, type }: { recipes: RecipeListItem[], type: RecipeListType }) {

    if (recipes.length === 0)
        return (
            <div className="flex flex-col items-center gap-3 text-text-light py-[20dvh]">
                <p>No recipes found.</p>
            </div>
        );


    return (
        <ul className="w-full sm:gap-3 gap-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {recipes.map((recipe) => (
                <li
                    key={recipe.id}
                    className="sm:p-3 px-2 pt-2 pb-3 bg-section sm:rounded-2xl rounded-xl text-text"
                >
                    <RecipeCard recipe={recipe} type={type} />
                </li>
            ))
            }
        </ul >
    );
}
