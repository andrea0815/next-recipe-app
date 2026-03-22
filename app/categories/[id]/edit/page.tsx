import { getCurrentDbUser } from "@/lib/auth/getCurrentDbUser";
import { getCategory } from "@/lib/db/categories";
import { notFound } from "next/navigation";

import { CategoryDraft } from "@/types/category";
import Navbar from '@/components/nav/Navbar';
import CategoryForm from "@/components/category/CategoryForm";
import { FormMode } from "@/types/general";

export default async function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {

  const { id } = await params;
  const user = await getCurrentDbUser();

  if (!user) {
    notFound();
  }
  const category: CategoryDraft | null = await getCategory(id)

  if (!category) {
    notFound();
  }

  return (
    <>
      <CategoryForm
        initialDraft={category}
        mode={FormMode.EDIT}
        submitButtonText={{ default: "Save Changes", pending: "Saving Changes …" }} />
    </>
  );
}
