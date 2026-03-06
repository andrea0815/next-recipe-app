import { prisma } from "@/lib/prisma";

export async function generateUniqueRecipeSlug(
    name: string,
    userId: string
) {
    const baseSlug = generateSlug(name);
    let slug = baseSlug;
    let counter = 2;

    while (true) {
        const existing = await prisma.recipes.findUnique({
            where: {
                owner_id_slug: {
                    owner_id: userId,
                    slug,
                },
            },
            select: { id: true },
        });

        if (!existing) return slug;

        slug = `${baseSlug}-${counter}`;
        counter++;
    }
}

export function generateSlug(text: string) {
    return text
        .toLowerCase()
        .trim()
        // German umlauts
        .replace(/ä/g, "ae")
        .replace(/ö/g, "oe")
        .replace(/ü/g, "ue")
        .replace(/ß/g, "ss")
        // remove accents from other characters
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        // remove invalid characters
        .replace(/[^a-z0-9\s-]/g, "")
        // spaces -> hyphen
        .replace(/\s+/g, "-")
        // collapse multiple hyphens
        .replace(/-+/g, "-");
}
