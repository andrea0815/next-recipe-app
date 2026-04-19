import { getRecipeBySlug } from "@/lib/db/recipes";
import { getCurrentDbUser } from "@/lib/auth/getCurrentDbUser";

import { notFound } from "next/navigation";

import DeleteButton from "@/components/buttons/DeleteButton";
import Button from "@/components/buttons/Button";
import Tag from "@/components/general/Tag";
import SectionWrapper from "@/components/containers/SectionWrapper";
import RecipeDetailIngredients from "./RecipeDetailIngredients";
import { RecipeListType } from "@/types/general";
import HeatingDetailCard from "./HeatingDetailCard";
import IconAlertTriangle from "../icons/IconAlertTriangle";
import { HEATING_META, HeatingMeta } from "@/types/recipe";
import { ReactNode } from "react";

export default function RecipeDetailSection({
    recipe,
    isOwnRecipe,
    groupedIngredients,
    type
}: {
    recipe: any,
    isOwnRecipe: boolean,
    groupedIngredients: Record<string, any[]>,
    type: RecipeListType
}) {

    const heatingOptions: HeatingMeta[] = Object.values(HEATING_META);

    const getHeatingMetaById = (id: string): HeatingMeta | null => {
        return heatingOptions.find((option) => option.id === id) ?? null;
    };
    const HeatingModeIcon = getHeatingMetaById(recipe.heating_mode)?.icon

    return (
        <div>
            <div className="w-full h-[50dvh] relative rounded-lg mb-6 overflow-hidden flex justify-center items-center">
                {recipe.image_uri && (
                    <img src={recipe.image_uri} alt={recipe.name} className="min-w-full min-h-full object-cover object-center" />
                )}

                {isOwnRecipe && (
                    <Tag customClass="absolute top-4 right-4">
                        {recipe.is_public ? "public" : "private"}
                    </Tag>
                )}
            </div>

            <h1 className='text-4xl text-center font-bold mb-1'>{recipe.name}</h1>

            <h2 className="text-xl text-center">{recipe.subtitle}</h2>

            {!isOwnRecipe &&
                <p className="text-md text-center mt-4">A recipe from{" "}
                    <a className="text-primary transition-colors underline underline-offset-2 hover:text-primaryOn" href={`/explore?query=${recipe.username}`}>
                        {recipe.username}
                    </a>
                </p>
            }

            <div className='flex gap-2 w-[60vw] m-auto justify-center mt-6 mb-15 flex-wrap'>
                {recipe.categories.map((category: any) => (
                    isOwnRecipe && type === RecipeListType.COLLECTION ? (
                        <Tag
                            key={category.id}
                            size="medium"
                            priority="secondary"
                            href={isOwnRecipe ? `/collection?category=${category.name}` : null}
                        >
                            {category.name}
                        </Tag>
                    ) : (
                        <Tag
                            key={category.id}
                            size="medium"
                            priority="secondary"
                        >
                            {category.name}
                        </Tag>
                    )
                ))}
            </div>

            <div className="flex md:flex-row-reverse flex-col gap-10">
                <div className="flex flex-col gap-4 md:min-w-100">
                    {recipe.heating_details_enabled &&
                        <div className="grid grid-cols-3 gap-2">
                            <HeatingDetailCard
                                label="Heating Mode"
                                icon={HeatingModeIcon ? <HeatingModeIcon /> : null}
                                value={getHeatingMetaById(recipe.heating_mode)?.name}
                            />
                            <HeatingDetailCard
                                label="Time"
                                icon={<IconAlertTriangle />}
                                value={recipe.time}
                            />
                            <HeatingDetailCard
                                label="Temperature"
                                icon={<IconAlertTriangle />}
                                value={recipe.temperature}
                            />
                        </div>
                    }

                    <SectionWrapper customClass="lg:self-start flex-1 w-full">
                        <RecipeDetailIngredients
                            groupedIngredients={groupedIngredients}
                            portions={Number(recipe.portions)}
                            groupsEnabled={!!recipe.groups_enabled}
                            recipeId={recipe.id}
                        />
                    </SectionWrapper>
                </div>

                <div className="flex-2 pb-15">
                    <h2 className='text-2xl  font-bold mb-6'>Instructions</h2>

                    <ul className='flex flex-col gap-6'>
                        {recipe.steps.length > 0 ?
                            recipe.steps.map((recipeStep: any, index: number) => (
                                <li key={index} className="flex gap-4">
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
                            ))
                            : (
                                <p>No instructions provided.</p>
                            )
                        }
                    </ul>
                </div>
            </div>

        </div >
    );
}
