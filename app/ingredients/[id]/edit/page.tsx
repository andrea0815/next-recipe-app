import { getCurrentDbUser } from "@/lib/auth/getCurrentDbUser";
import { getIngredient } from "@/lib/db/ingredients";
import { notFound } from "next/navigation";

import { IngredientDraft } from "@/types/ingredient";
import Navbar from '@/components/nav/Navbar';
import IngredientForm from "@/components/ingredient/IngredientForm";
import { FormMode } from "@/types/general";

export default async function EditIngredientPage({ params }: { params: Promise<{ id: string }> }) {

  const { id } = await params;
  const user = await getCurrentDbUser();

  if (!user) {
    notFound();
  }
  const ingredient: IngredientDraft | null = await getIngredient(id)

  if (!ingredient) {
    notFound();
  }

  return (
    <>
      <IngredientForm
        initialDraft={ingredient}
        mode={FormMode.EDIT}
        submitButtonText={{ default: "Save Changes", pending: "Saving Changes …" }} />
    </>
  );
}
