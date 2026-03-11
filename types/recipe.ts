export type Recipe = {
    id: string;
    name: string;
    slug: string;
    subtitle: string;
    is_public: boolean;
    image_uri: string | null;
    owner_id: string;
    categories: string[];
    ingredients: IngredientLineInput[];
}

export type IngredientLineInput = {
    ingredient_id: string;
    unit_id: string;
    amount: number;
    group_name: string;
    position: number;
    on_shopping_list?: boolean | null;
};

export type RecipeStep = {
    recipe_id?: string;
    step_index: number;
    text: string;
    hint: string | null;
};