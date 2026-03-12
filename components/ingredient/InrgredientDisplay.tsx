import type { Ingredient } from "@/types/ingredient";

export default function IngredientDisplay({
    amount,
    ingredient,
}: {
    amount?: number;
    ingredient?: Ingredient;
}) {
    if (!ingredient) return <>No ingredient passed</>;

    if (amount === undefined || amount === null) {
        return <>{ingredient.name}</>;
    }

    const displayed =
        Number(amount) > 1
            ? ingredient.plural ?? ingredient.name
            : ingredient.name;

    return <>{displayed}</>;
}