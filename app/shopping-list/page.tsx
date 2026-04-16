import { getCurrentDbUser } from "@/lib/auth/getCurrentDbUser";
import Image from "next/image";
import Link from "next/link";
import { getShoppingItemsByUser } from "@/lib/db/shoppingList";
import { removeAllShoppingItems } from "@/actions/shoppingList";
import { RecipeListItem } from "@/types/recipe";
import SectionWrapper from "@/components/containers/SectionWrapper";
import PageHeadline from "@/components/typography/PageHeadline";
import Button from "@/components/buttons/Button";
import ShoppingList from "@/components/shoppinglist/ShoppingList";


export default async function ShoppingListPage() {

  const user = await getCurrentDbUser();

  const ShoppingItems = await getShoppingItemsByUser(user?.id ?? undefined);

  return (
    <>
      <div className="flex flex-col gap-6 w-full items-center flex-1">
        <PageHeadline>Shopping List</PageHeadline>
        <SectionWrapper customClass="max-w-200 w-full flex-1 flex flex-col justify-start items-center">
          <ShoppingList items={ShoppingItems} />
        </SectionWrapper>
      </div>
    </>
  );
}
