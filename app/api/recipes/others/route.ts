import { NextRequest, NextResponse } from "next/server";
import { getOtherRecipes } from "@/lib/db/recipes";
import { getCurrentDbUser } from "@/lib/auth/getCurrentDbUser";

export async function GET(req: NextRequest) {
    const user = await getCurrentDbUser();

    const searchParams = req.nextUrl.searchParams;

    const query = searchParams.get("query") ?? undefined;
    const cursor = searchParams.get("cursor") ?? undefined;
    const categoryNames = searchParams.getAll("category");
    const ingredientNames = searchParams.getAll("ingredients");

    const data = await getOtherRecipes({
        categoryNames,
        ingredientNames,
        take: 12,
        ...(user?.id !== undefined ? { userId: user.id } : {}),
        ...(query !== undefined ? { query } : {}),
        ...(cursor !== undefined ? { cursor } : {}),
    });

    return NextResponse.json(data);
}
