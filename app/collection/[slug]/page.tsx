"use server"

import { getRecipeBySlug } from "@/lib/db/recipes";
import { getCurrentDbUser } from "@/lib/auth/getCurrentDbUser";

import { notFound } from "next/navigation";

import DeleteButton from "./DeleteButton";
import Button from "@/components/buttons/Button";
import Tag from "@/components/general/Tag";
import SectionWrapper from "@/components/containers/SectionWrapper";
import IngredientSection from "./IngredientSection";

export default async function RecipePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const user = await getCurrentDbUser();

    if (!user) {
        notFound();
    }

    const recipe = await getRecipeBySlug(slug, user.id);

    if (!recipe) {
        notFound();
    }

    const safeIngredients = recipe.recipe_ingredients.map((recipeIngredient) => ({
        ...recipeIngredient,
        amount: Number(recipeIngredient.amount),
        position: Number(recipeIngredient.position),
    }));

    const groupedIngredients = safeIngredients.reduce((acc, recipeIngredient) => {
        const groupName = recipe.groups_enabled
            ? recipeIngredient.group_name?.trim() || "General"
            : "Zutaten";

        if (!acc[groupName]) {
            acc[groupName] = [];
        }

        acc[groupName].push(recipeIngredient);
        return acc;
    }, {} as Record<string, typeof safeIngredients>);

    return (
        <main>

            <div>
                <div className="w-full h-[50dvh] relative rounded-lg mb-6 overflow-hidden flex justify-center items-center">
                    {recipe.image_uri && (
                        <img src={recipe.image_uri} alt={recipe.name} className="min-w-full min-h-full object-cover object-center" />
                    )}

                    <Tag customClass="absolute top-4 right-4">
                        {recipe.is_public ? "public" : "private"}
                    </Tag>
                </div>

                <div className="flex items-center justify-end gap-2">
                    <Button
                        href={`/collection/${slug}/edit`}
                        size="small"
                        priority="secondary"
                    >Edit</Button>
                    <DeleteButton itemId={recipe.id} />
                </div>

                <h1 className='text-4xl text-center font-bold mb-1'>{recipe.name}</h1>

                <h2 className="text-xl text-center">{recipe.subtitle}</h2>

                <div className='flex gap-2 w-[60vw] m-auto justify-center mt-6 mb-15 flex-wrap'>
                    {recipe.recipe_categories.map((recipeCategory) => (
                        <Tag
                            key={recipeCategory.categories.id}
                            size="small"
                            priority="secondary"
                        >
                            {recipeCategory.categories.name}
                        </Tag>
                    ))}
                </div>

                <div className="flex lg:flex-row-reverse flex-col gap-10">
                    <SectionWrapper customClass="lg:self-start pb-15 flex-1">
                        <IngredientSection
                            groupedIngredients={groupedIngredients}
                            portions={Number(recipe.portions)}
                            groupsEnabled={recipe.groups_enabled}
                        />
                    </SectionWrapper>


                    <div className="flex-2 max-w-200 pb-15">
                        <h2 className='text-2xl  font-bold mb-6'>Steps</h2>

                        <ul className='flex flex-col gap-6'>
                            {recipe.recipe_steps.map((recipeStep, index) => (
                                <li key={recipeStep.id} className="flex gap-4">
                                    <p className="bg-gray-200 self-start w-7 h-7 rounded-full text-text flex justify-center items-center -translate-y-1">{index + 1}</p>
                                    <div className="flex-1">
                                        <p>{recipeStep.text}</p>
                                        {recipeStep.hint && (
                                            <div className="w-full p-4 mt-4 bg-gray-300 rounded-2xl">
                                                <span className="font-bold uppercase text-sm">Hint:</span>
                                                <p>{recipeStep.hint}</p>
                                            </div>
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

            </div>
        </main >
    );
}
