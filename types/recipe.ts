import type { Category } from "@/types/category";

export type Recipe = {
    id: string;
    name: string;
    slug: string;
    subtitle: string;
    is_public: boolean;
    image_uri: string;
    owner_id: string;
    categories: string[];
    portions: number;
    groups_enabled: number;
    ingredients: IngredientLineInput[];
}

export type RecipeListItem = {
    id: string;
    name: string;
    slug: string;
    subtitle: string;
    is_public: boolean;
    image_uri: string;
    owner_id: string;
    categories: Category[];
}

export type IngredientLineInput = {
    ingredient_id: string;
    unit_id: string;
    amount: number;
    group_name: string;
    owner_id: string;
    position: number;
    on_shopping_list?: boolean | null;
};

export type RecipeStep = {
    recipe_id?: string;
    step_index: number;
    text: string;
    hint: string | null;
};

// ––––––––––––––––
// For the RecipeForm

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

export type RecipeStepDraft = {
    step_index: number;
    text: string;
    hint: string;
    hint_is_showing: boolean;
};

export type RecipeDraft = {
    id: string;
    name: string;
    subtitle: string;
    slug: string;
    image_uri: string;
    is_public: boolean;
    portions: number;
    groups_enabled: boolean;
    category_ids: string[];
    groups: RecipeGroupDraft[];
    steps: RecipeStepDraft[];
};