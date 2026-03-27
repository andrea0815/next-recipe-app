"use client";

import IngredientForm from '@/components/ingredient/IngredientForm';
import { FormMode } from "@/types/general";
import type { IngredientDraft } from '@/types/ingredient';


export default function AddIngredientPage() {

  const emptyDraft: IngredientDraft = {
    id: "",
    name: "",
    plural: "",
  };

  return (<>
    <IngredientForm
      initialDraft={emptyDraft}
      mode={FormMode.CREATE}
      submitButtonText={{ default: "Save Changes", pending: "Saving Changes …" }} />
  </>
  );
}
