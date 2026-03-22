import { FormMode } from '@/types/general';
import { IngredientDraft } from "@/types/ingredient";

import Navbar from '@/components/nav/Navbar';
import IngredientForm from '@/components/ingredient/IngredientForm';

export default function AddIngredientPage() {

  const emptyDraft: IngredientDraft = {
    id: "",
    name: "",
    plural: "",
  };

  return (
    <>
      <IngredientForm
        initialDraft={emptyDraft}
        mode={FormMode.CREATE}
        submitButtonText={{ default: "Add Ingredient", pending: "Creating Ingredient …" }} />
    </>
  );
}
