
import { getCurrentDbUser } from "@/lib/auth/getCurrentDbUser";
import { getCategories } from "@/lib/db/categories";
import { getUnits } from "@/lib/db/units";
import { getIngredients } from "@/lib/db/ingredients";
import { getRecipeBySlug } from "@/lib/db/recipes";
import { notFound } from "next/navigation";

import type { Category } from '@/types/category';
import type { Ingredient } from "@/types/ingredient";
import type { Unit } from "@/types/unit";
import type { RecipeDraft, RecipeGroupDraft, RecipeLineDraft } from '@/types/recipe';
import { FormMode } from '@/types/general';


import RecipeForm from '@/components/recipe/RecipeForm';
import FormSection from "@/components/containers/FormSection";
import HeaderBack from "@/components/nav/HeaderBack";
import GeneralSection from "@/components/containers/GeneralSection";
import HeaderRecipeDetail from "@/components/nav/HeaderRecipeDetail";
import NoPermissionClient from "@/components/errors/NotPermissionClient";

export default async function EditRecipePage({ params }: { params: Promise<{ slug: string }> }) {

    const { slug } = await params;
    const user = await getCurrentDbUser();

    if (!user) {
        throw new Error("You must be signed in.");
    }

    const categories: Category[] = await getCategories(undefined, user?.id ?? undefined);
    const ingredients: Ingredient[] = await getIngredients(undefined, user?.id ?? undefined);
    const units: Unit[] = await getUnits(undefined, user?.id ?? undefined);
    const recipe = await getRecipeBySlug(slug, user.id);

    if (!recipe) {
        notFound();
    }

    const groupsMap = new Map<string, RecipeLineDraft[]>();

    for (const ingredientLine of recipe.ingredients) {
        const groupName = ingredientLine.group_name ?? "";

        const line: RecipeLineDraft = {
            amount: Number(ingredientLine.amount),
            unit_id: ingredientLine.unit_id,
            ingredient_id: ingredientLine.ingredient_id,
        };

        const existing = groupsMap.get(groupName) ?? [];
        existing.push(line);
        groupsMap.set(groupName, existing);
    }

    const groups: RecipeGroupDraft[] = Array.from(groupsMap.entries()).map(
        ([group_name, lines]) => ({
            group_name,
            draft: { amount: 1, unit_id: "", ingredient_id: "" },
            lines,
        })
    );

    const propagatedDraft: RecipeDraft = {
        id: recipe.id,
        name: recipe.name,
        subtitle: recipe.subtitle,
        slug: recipe.slug,
        image_uri: recipe.image_uri,
        is_public: recipe.is_public,
        portions: recipe.portions,
        groups_enabled: recipe.groups_enabled,
        category_ids: recipe.categories.map((category) => category.id),
        groups: groups,
        heating_details_enabled: recipe.heating_details_enabled,
        time: recipe.time,
        temperature: recipe.temperature,
        heating_mode: recipe.heating_mode,
        steps: recipe.steps.map(
            (step: {
                text: string;
                hint: string | null;
                step_index: number;
            }) => ({
                text: step.text,
                hint: step.hint ?? "",
                step_index: step.step_index,
                hint_is_showing: !!step.hint,
            })
        ),
    };

    const isOwner = recipe.owner_id === user.id;

    if (!isOwner) return (<>
        <HeaderRecipeDetail recipeId={recipe.id} slug={recipe.slug} isOwner={isOwner} />
        <NoPermissionClient />
    </>)

    return (
        <>
            <HeaderBack />
            <GeneralSection>
                <FormSection headline="Edit Recipe">
                    <RecipeForm categories={categories} initialIngredients={ingredients} units={units} initialDraft={propagatedDraft} mode={FormMode.EDIT} />
                </FormSection>
            </GeneralSection>
        </>
    );
}

