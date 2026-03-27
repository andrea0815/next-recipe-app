"use client";

import { FormMode } from "@/types/general";
import type { CategoryDraft } from '@/types/category';
import CategoryForm from "@/components/category/CategoryForm";

export default function AddCategoryPage() {

  const emptyDraft: CategoryDraft = {
    id: "",
    name: "",
    owner_id: "",
  };

  return (<>
    <CategoryForm
      initialDraft={emptyDraft}
      mode={FormMode.CREATE}
      submitButtonText={{ default: "Save Changes", pending: "Saving Changes …" }} />
  </>
  );
}
