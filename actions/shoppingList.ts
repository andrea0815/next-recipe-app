"use server";

// import { updateShoppingListStatus } from '@/lib/db/recipes';
import { setShoppingListStatusByUser, updateShoppingListStatus } from '@/lib/db/shoppingList';

export async function editShoppingListStatus(ingredientLineId: string, onShoppingList: boolean) {

    console.log("action update shopping list");

    await updateShoppingListStatus(
        ingredientLineId,
        onShoppingList,
    );
}

export async function clearShoppingListByUser(userId: string, onShoppingList: boolean) {

    await setShoppingListStatusByUser(
        userId,
        onShoppingList,
    );
}