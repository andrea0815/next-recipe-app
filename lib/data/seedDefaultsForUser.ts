import { prisma } from "@/lib/prisma";
import {
  defaultIngredients,
  defaultCategories,
  defaultUnits,
} from "@/lib/data/defaultUserData";

export async function seedDefaultsForUser(userId: string) {
  await prisma.$transaction([
    prisma.ingredients.createMany({
      data: defaultIngredients.map((item) => ({
        name: item.name,
        plural: item.plural ?? null,
        owner_id: userId,
      })),
    }),
    prisma.categories.createMany({
      data: defaultCategories.map((item) => ({
        name: item.name,
        owner_id: userId,
      })),
    }),
    prisma.units.createMany({
      data: defaultUnits.map((item) => ({
        name: item.name,
        plural: item.plural ?? null,
        abbreviation: item.abbreviation ?? null,
        owner_id: userId,
      })),
    }),
  ]);
}