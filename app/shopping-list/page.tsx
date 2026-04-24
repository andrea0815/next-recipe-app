import { getCurrentDbUser } from "@/lib/auth/getCurrentDbUser";
import { getShoppingItemsByUser } from "@/lib/db/shoppingList";
import ShoppingListSection from "./ShoppingListSection";


export default async function ShoppingListPage() {

  const user = await getCurrentDbUser();

  if (!user) {
    throw new Error("You must be signed in.");
  }

  const ShoppingItems = await getShoppingItemsByUser(user?.id ?? undefined);

  return (
    <>
      <ShoppingListSection shoppingItems={ShoppingItems} />
    </>
  );
}
