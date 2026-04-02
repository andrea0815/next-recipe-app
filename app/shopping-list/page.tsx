import { getCurrentDbUser } from "@/lib/auth/getCurrentDbUser";
import Image from "next/image";
import Link from "next/link";
import { getShoppingListItems } from "@/lib/db/shoppingList";
import { clearShoppingListByUser } from "@/actions/shoppingList";
import { RecipeListItem } from "@/types/recipe";
import SectionWrapper from "@/components/containers/SectionWrapper";
import PageHeadline from "@/components/typography/PageHeadline";
import Button from "@/components/buttons/Button";
import ShoppingList from "./ShoppingList";


export default async function ShoppingListPage() {

  const user = await getCurrentDbUser();

  const shoppingListItems = await getShoppingListItems(user?.id ?? undefined);

  console.log(shoppingListItems);


  return (
    <>
      <div className="flex flex-col gap-6 w-full items-center flex-1">
        <PageHeadline>Shopping List</PageHeadline>

        <form
          action={async () => {
            "use server";
            await clearShoppingListByUser(user?.id ?? "", false);
          }}
        >
          <Button priority="secondary" type="submit" disabled={shoppingListItems.length === 0}>
            Clear Shopping List
          </Button>
        </form>

        <SectionWrapper customClass="max-w-200 w-full flex-1 flex flex-col justify-center items-center">
          <ShoppingList items={shoppingListItems} />
        </SectionWrapper>
      </div>
    </>
  );
}
