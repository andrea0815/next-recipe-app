import SearchPanel from "./SearchPanel";
import { getIngredientsByUserId } from "@/lib/db/ingredients";

export default async function SearchPanelServer({ userId }: { userId: string }) {
    const ingredientsPromise = getIngredientsByUserId(undefined, userId);

    return <SearchPanel ingredientsPromise={ingredientsPromise} />;
}