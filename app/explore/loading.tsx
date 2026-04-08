import RecipeListSkeleton from "@/components/recipe/RecipeListSkeleton";

export default function Loading() {
    return (
        <div className="w-full flex flex-col gap-6">
            <RecipeListSkeleton />
        </div>
    );
}