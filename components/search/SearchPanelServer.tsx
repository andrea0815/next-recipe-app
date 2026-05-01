import SearchPanel from "./SearchPanel";
import { getIngredientsByUserId } from "@/lib/db/ingredients";

export default async function SearchPanelServer({ userId }: { userId?: string | null }) {
    const ingredientsPromise = getIngredientsByUserId(undefined, userId ?? undefined);

    return <SearchPanel ingredientsPromise={ingredientsPromise} />;
}