import { getCurrentDbUser } from "@/lib/auth/getCurrentDbUser";
import { getCategories } from "@/lib/db/categories";
import { getUnits } from "@/lib/db/units";
import { getIngredients } from "@/lib/db/ingredients";

import type { RecipeDraft } from '@/types/recipe';
import { FormMode } from '@/types/general';

import RecipeForm from '@/components/recipe/RecipeForm';
import FormSection from "@/components/containers/FormSection";
import GeneralSection from "@/components/containers/GeneralSection";
import HeaderBack from "@/components/nav/HeaderBack";

export default async function AddRecipePage() {

  const user = await getCurrentDbUser();

  if (!user) {
    throw new Error("You must be signed in.");
  }  

  const emptyDraft: RecipeDraft = {
    id: "",
    name: "",
    subtitle: "",
    slug: "",
    image_uri: "/images/placeholder.png",
    is_public: user.recipe_public_by_default ?? true,
    portions: 2,
    groups_enabled: false,
    category_ids: [],
    heating_details_enabled: false,
    time: 10,
    temperature: 180,
    heating_mode: "",
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

  const categoriesPromise = getCategories(undefined, user?.id ?? undefined);
  const ingredientsPromise = getIngredients(undefined, user?.id ?? undefined);
  const unitsPromise = getUnits(undefined, user?.id ?? undefined);

  return (<>
    <>
      <HeaderBack />
      <GeneralSection>
        <FormSection headline="Create Recipe">
          <RecipeForm
            categoriesPromise={categoriesPromise}
            ingredientsPromise={ingredientsPromise}
            unitsPromise={unitsPromise}
            initialDraft={emptyDraft}
            mode={FormMode.CREATE} />
        </FormSection>
      </GeneralSection>
    </>
  </>
  );
}

