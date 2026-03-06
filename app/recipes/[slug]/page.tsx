"use server"

import { getRecipeBySlug } from "@/lib/db/recipes";
import { getCurrentDbUser } from "@/lib/auth/getCurrentDbUser";
import { formatAmount } from "@/lib/db/utils/formatDecimals";

import { notFound } from "next/navigation";

import Navbar from '@/components/Navbar';

export default async function RecipePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const user = await getCurrentDbUser();

    console.log(user);

    if (!user) {
        notFound();
    }

    const recipe = await getRecipeBySlug(slug, user.id);
    console.log(recipe);

    if (!recipe) {
        notFound();
    }



    return (
        <main>
            <Navbar />

            <div>
                <h2 className='text-3xl'>{recipe.name}</h2>

                <h1>{recipe.subtitle}</h1>

                <p>{recipe.is_public ? "public" : "private"}</p>

                {recipe.image_uri && (
                    <img src={recipe.image_uri} alt={recipe.name} className="w-full h-48 object-cover rounded-lg mt-2" />
                )}

                <h2 className='text-xl mt-5'>Categories</h2>
                <div className='flex gap-2'>
                    {recipe.recipe_categories.map((recipeCategory) => (
                        <p key={recipeCategory.categories.id}>{recipeCategory.categories.name}</p>
                    ))}
                </div>

                <h2 className='text-xl mt-5'>Ingredients</h2>
                <ul className='flex flex-col w-[200px]'>
                    {recipe.recipe_ingredients.map((recipeIngredient) => (
                        <li key={recipeIngredient.id} className="grid grid-cols-3 ">
                            <p>{formatAmount(Number(recipeIngredient.amount))}</p>
                            <p>{recipeIngredient.units.abbreviation}</p>
                            <p>{recipeIngredient.ingredients.name}</p>
                        </li>
                    ))}
                </ul>

            </div>
        </main>
    );
}
