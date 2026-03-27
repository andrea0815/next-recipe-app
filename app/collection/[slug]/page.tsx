"use server"

import { getRecipeBySlug } from "@/lib/db/recipes";
import { getCurrentDbUser } from "@/lib/auth/getCurrentDbUser";
import { formatAmount } from "@/lib/db/utils/formatDecimals";

import { notFound } from "next/navigation";

import UnitDisplay from "@/components/unit/UnitDisplay";
import InrgredientDisplay from "@/components/ingredient/InrgredientDisplay";
import Link from "next/link";
import DeleteButton from "./DeleteButton";

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

    const groupedIngredients = recipe.recipe_ingredients.reduce((acc, recipeIngredient) => {
        const groupName = recipe.groups_enabled
            ? recipeIngredient.group_name?.trim() || "General"
            : "Zutaten";

        if (!acc[groupName]) {
            acc[groupName] = [];
        }

        acc[groupName].push(recipeIngredient);
        return acc;
    }, {} as Record<string, typeof recipe.recipe_ingredients>);

    return (
        <main>

            <Link href={`/collection/${slug}/edit`}>Edit</Link>
            <DeleteButton itemId={recipe.id} />


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

                <p>{recipe.portions.toString()} {Number(recipe.portions) < 2 ? "Portion" : "Portionen"} </p>

                <div className="space-y-4">
                    {Object.entries(groupedIngredients).map(([groupName, ingredients]) => (
                        <div key={groupName}>
                            {recipe.groups_enabled && (
                                <h3 className="font-semibold text-text mb-2">{groupName}</h3>
                            )}

                            <ul className="flex flex-col w-[200px]">
                                {ingredients.map((recipeIngredient) => (
                                    <li key={recipeIngredient.id} className="grid grid-cols-3">
                                        <p>{formatAmount(Number(recipeIngredient.amount.toString()))}</p>
                                        <p><UnitDisplay amount={recipeIngredient.amount} unit={recipeIngredient.units} />{" "}</p>
                                        <p><InrgredientDisplay amount={Number(recipeIngredient.amount)} ingredient={recipeIngredient.ingredients} /></p>

                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <h2 className='text-xl mt-5'>Steps</h2>

                <ul className='flex flex-col'>
                    {recipe.recipe_steps.map((recipeStep) => (
                        <li key={recipeStep.id} className="block">
                            <p className="p-5"><span>{recipeStep.step_index + 1}.</span> {recipeStep.text}</p>
                            {recipeStep.hint && (
                                <p className="p-5 m-5 bg-gray-700 rounded-2xl">
                                    Hint: {recipeStep.hint}
                                </p>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </main>
    );
}
