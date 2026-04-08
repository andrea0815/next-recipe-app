import { getCurrentDbUser } from "@/lib/auth/getCurrentDbUser";
import { getCategories } from "@/lib/db/categories";
import { getUnits } from "@/lib/db/units";
import { getIngredients } from "@/lib/db/ingredients";

import type { Category } from '@/types/category';
import type { Ingredient } from "@/types/ingredient";
import type { Unit } from "@/types/unit";
import type { RecipeDraft } from '@/types/recipe';
import { FormMode } from '@/types/general';

import RecipeForm from '@/components/recipe/RecipeForm';
import FormSection from "@/components/containers/FormSection";
import GeneralSection from "@/components/containers/GeneralSection";


export default async function AddRecipePage() {

  const user = await getCurrentDbUser();

  const categories: Category[] = await getCategories(undefined, user?.id ?? undefined);
  const ingredients: Ingredient[] = await getIngredients(undefined, user?.id ?? undefined);
  const units: Unit[] = await getUnits(undefined, user?.id ?? undefined);

  const emptyDraft: RecipeDraft = {
    id: "",
    name: "",
    subtitle: "",
    slug: "",
    image_uri: "/images/placeholder.png",
    is_public: false,
    portions: 2,
    groups_enabled: false,
    category_ids: [],
    groups: [
      {
        group_name: "",
        draft: { amount: 1, unit_id: "", ingredient_id: "" },
        lines: [],
      },
    ],
    steps: [
      {
        step_index: 0,
        text: "",
        hint_is_showing: false,
        hint: "",
      },
    ],
  };

  return (<>
    <GeneralSection>
      <FormSection headline="Create Recipe">
        <RecipeForm categories={categories} initialIngredients={ingredients} units={units} initialDraft={emptyDraft} mode={FormMode.CREATE} />
        {/* <AddIngredientPanel /> */}
      </FormSection>
    </GeneralSection>
  </>
  );
}

