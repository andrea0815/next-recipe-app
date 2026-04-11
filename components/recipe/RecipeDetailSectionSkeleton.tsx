import { getRecipeBySlug } from "@/lib/db/recipes";
import { getCurrentDbUser } from "@/lib/auth/getCurrentDbUser";

import { notFound } from "next/navigation";

import DeleteButton from "@/components/buttons/DeleteButton";
import Button from "@/components/buttons/Button";
import Tag from "@/components/general/Tag";
import SectionWrapper from "@/components/containers/SectionWrapper";
import RecipeDetailIngredients from "./RecipeDetailIngredients";
import { RecipeListType } from "@/types/general";

export default function RecipeDetailSectionSkeleton() {

    return (
        <div className="w-full flex flex-col items-center">
            <div className="w-full h-[50dvh] relative rounded-lg mb-6 overflow-hidden flex justify-center items-center bg-gray-200 animate-pulse">
            </div>

            <h1 className='text-4xl h-20 w-150 text-center rounded-lg font-bold mb-1 bg-gray-200 animate-pulse'></h1>

            <h2 className="text-xl h-10 w-100 text-center rounded-lg bg-gray-200 animate-pulse"></h2>

            <div className='flex gap-2 w-[60vw] m-auto justify-center mt-6 mb-15 flex-wrap'>
                {Array.from({ length: 5 }).map((category: any) => (
                    <div className="h-10 w-25 rounded-full bg-gray-200 animate-pulse"></div>
                ))}
            </div>

            <div className="w-full flex lg:flex-row-reverse flex-col gap-10">
                <SectionWrapper customClass="lg:self-start flex-1">
                    <div className="w-full h-[50dvh] relative rounded-lg mb-6 overflow-hidden flex justify-center items-center bg-gray-200 animate-pulse">
                    </div>
                </SectionWrapper>


                <div className="flex-2 max-w-200 pb-15">
                    <h2 className='text-2xl  font-bold mb-6'>Steps</h2>

                    <ul className='flex flex-col gap-6'>
                        {Array.from({ length: 4 }).map((recipeStep: any, index: number) => (
                            <li key={index} className="flex gap-4">
                                <p className="bg-gray-200 self-start w-7 h-7 rounded-full text-text flex justify-center items-center -translate-y-1"></p>
                                <div className="flex-1">
                                    <p className="h-10 w-full text-center rounded-lg bg-gray-200 animate-pulse"></p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

        </div >
    );
}
