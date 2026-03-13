import React from 'react';
import { getCategories } from "@/lib/db/categories";
import { getCurrentDbUser } from "@/lib/auth/getCurrentDbUser";
import CategoryItems from './CategoryItems';
import type { Category } from '@/types/category';

export default async function RecipeList() {

  const user = await getCurrentDbUser();

  const categories: Category[] = await getCategories(undefined, user?.id ?? undefined);

  return (
    <CategoryItems categories={categories}></CategoryItems>
  );
}
