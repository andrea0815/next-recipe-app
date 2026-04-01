import { getCurrentDbUser } from "@/lib/auth/getCurrentDbUser";
import Image from "next/image";
import Link from "next/link";
import { getShoppingListItems } from "@/lib/db/shoppingList";
import { RecipeListItem } from "@/types/recipe";
import ShoppingListCheckbox from "@/components/recipe/ShoppingListCheckbox";
import SectionWrapper from "@/components/containers/SectionWrapper";
import PageHeadline from "@/components/typography/PageHeadline";
import Button from "@/components/buttons/Button";


export default async function ShoppingListPage() {

  const user = await getCurrentDbUser();

  const shoppingListItems = await getShoppingListItems(user?.id ?? undefined);

  console.log(shoppingListItems);


  return (
    <>
      <div className="flex flex-col gap-6 max-w-full items-center">
        <PageHeadline>Shopping List</PageHeadline>

        <Button
          priority="secondary"

        >Clear Shopping List</Button>

        <SectionWrapper customClass="max-w-200 w-full">
          <ul>
            {shoppingListItems.map((item) => (
              <li key={item.id}
                className="flex py-2 border-b last-of-type:border-b-0 border-gray-300 items-center gap-4">
                <ShoppingListCheckbox
                  recipeIngredientId={item.id}
                  initialChecked={!!item.on_shopping_list}
                />
                <p>{Number(item.amount)}</p>
                <p>{item.unit.abbreviation}</p>
                <p>{item.ingredient.name}</p>
              </li>
            ))}
          </ul>
        </SectionWrapper>

      </div>
    </>
  );
}
