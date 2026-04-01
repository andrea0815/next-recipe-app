import { updateShoppingListStatus } from '@/lib/db/recipes';

export async function editShoppingListStatus(ingredientLineId: string, onShoppingList: boolean) {
    await updateShoppingListStatus(
        ingredientLineId,
        onShoppingList,
    );
}