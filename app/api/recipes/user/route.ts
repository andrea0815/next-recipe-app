import { NextRequest, NextResponse } from "next/server";
import { getUserRecipes } from "@/lib/db/recipes";
import { getCurrentDbUser } from "@/lib/auth/getCurrentDbUser";

export async function GET(req: NextRequest) {
  const user = await getCurrentDbUser();

  if (!user) {
    return {
      errors: {
        form: "You must be signed in.",
      },
    };
  }

  const searchParams = req.nextUrl.searchParams;

  const query = searchParams.get("query") ?? undefined;
  const cursor = searchParams.get("cursor") ?? undefined;
  const categoryIds = searchParams.getAll("categoryIds");

  const data = await getUserRecipes({
    query,
    userId: user.id,
    cursor,
    categoryIds,
    take: 12,
  });

  return NextResponse.json(data);
}