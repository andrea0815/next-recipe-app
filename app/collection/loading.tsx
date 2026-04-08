import RecipeListSkeleton from "@/components/recipe/RecipeListSkeleton";

export default function Loading() {
    return (
        <div className="w-full flex flex-col gap-6">
            <div className="h-10 w-40 rounded-xl bg-gray-200 animate-pulse" />
            <RecipeListSkeleton />
        </div>
    );
}