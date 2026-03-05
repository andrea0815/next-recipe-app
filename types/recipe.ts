export type Recipe = {
    id: string;
    name: string;
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
    amount: string; // best practice: string for Decimal
    on_shopping_list?: boolean;
};