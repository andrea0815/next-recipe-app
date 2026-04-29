import { getCurrentDbUser } from "@/lib/auth/getCurrentDbUser";
import { getShoppingItemsByUser } from "@/lib/db/shoppingList";
import ShoppingListSection from "./ShoppingListSection";
import NotSignedIn from "@/components/general/NotSignedIn";


export default async function ShoppingListPage() {

  const user = await getCurrentDbUser();

  if (!user) {
    return <NotSignedIn />;
  }

  const ShoppingItems = await getShoppingItemsByUser(user?.id ?? undefined);

  return (
    <>
      <ShoppingListSection shoppingItems={ShoppingItems} />
    </>
  );
}
