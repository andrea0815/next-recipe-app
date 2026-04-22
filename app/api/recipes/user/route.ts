import { NextRequest, NextResponse } from "next/server";
import { getUserRecipes } from "@/lib/db/recipes";
import { getCurrentDbUser } from "@/lib/auth/getCurrentDbUser";

export async function GET(req: NextRequest) {
  const user = await getCurrentDbUser();

  if (!user) {
    return NextResponse.json(
      {
        errors: {
          form: "You must be signed in.",
        },
      },
      { status: 401 }
    );
  }

  const searchParams = req.nextUrl.searchParams;

  const query = searchParams.get("query") ?? undefined;
  const cursor = searchParams.get("cursor") ?? undefined;
  const categoryNames = searchParams.getAll("category");

  const data = await getUserRecipes({
    userId: user.id,
    categoryNames,
    take: 12,
    ...(query !== undefined ? { query } : {}),
    ...(cursor !== undefined ? { cursor } : {}),
  });

  return NextResponse.json(data);
}