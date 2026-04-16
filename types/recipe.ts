import type { Category } from "@/types/category";
import { Ingredient } from "./ingredient";
import { Unit } from "./unit";

export type IngredientLineBase = {
    ingredient_id: string;
    unit_id: string;
    amount: number;
    position: number;
};

export type IngredientLineInput = IngredientLineBase & {
    group_name: string;
    owner_id: string;
    on_shopping_list?: boolean | null;
};

export type RecipeIngredient = IngredientLineInput & {
    id: string;
    ingredient: Ingredient;
    unit: Unit | null;
};

export type ShoppingListIngredientLine = {
    id: string;
    on_shopping_list?: boolean | null;
};

export type RecipeStepBase = {
    step_index: number;
    text: string;
    hint: string | null;
};

export type RecipeStep = RecipeStepBase & {
    recipe_id?: string;
};

export type RecipeBase = {
    id: string;
    name: string;
    slug: string;
    subtitle: string;
    is_public: boolean;
    image_uri: string;
    owner_id: string;
    portions: number;
    groups_enabled: boolean;
};

export type Recipe = RecipeBase & {
    categories: Category[];
    ingredients: IngredientLineInput[];
    steps: RecipeStep[];
};

export type RecipeListItem = Pick<
    RecipeBase,
    "id" | "name" | "slug" | "subtitle" | "is_public" | "image_uri" | "owner_id"
> & {
    categories: Category[];
    username?: string | null;
};

export type RecipeLineDraft = {
    amount: number;
    unit_id: string;
    ingredient_id: string;
};

export type RecipeGroupDraft = {
    group_name: string;
    draft: RecipeLineDraft;
    lines: RecipeLineDraft[];
};

export type RecipeStepDraft = Omit<RecipeStepBase, "hint"> & {
    hint: string;
    hint_is_showing: boolean;
};

export type RecipeDraft = Pick<
    RecipeBase,
    "id" | "name" | "subtitle" | "slug" | "image_uri" | "is_public" | "portions" | "groups_enabled"
> & {
    category_ids: string[];
    groups: RecipeGroupDraft[];
    steps: RecipeStepDraft[];
};

export type RecipeFields = {
    name?: string;
    subtitle?: string;
    image_uri?: string;
    category_ids?: string;
    ingredient_ids?: string;
    group_names?: string;
    portions?: string;
    unit_ids?: string;
    amounts?: string;
    text?: string;
    hint?: string;
    form?: string;
};