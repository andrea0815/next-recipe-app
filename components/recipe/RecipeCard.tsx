import React, { Suspense } from 'react';
import Link from 'next/link';
import Image from "next/image";

import type { RecipeListItem } from '@/types/recipe';
import { RecipeListType } from '@/types/general';

import Tag from '../general/Tag';


export default function RecipeCard({ recipe, type }: { recipe: RecipeListItem, type: RecipeListType }) {

    return (
        <div
            className="flex flex-col h-full justify-between">
            <div>

                <div className="relative aspect-square">

                    {recipe.image_uri && (
                        <Link href={
                            type === RecipeListType.COLLECTION ?
                                `/collection/${recipe.slug}` :
                                `/explore/${recipe.slug}`
                        }>

                            <Image
                                src={recipe.image_uri}
                                alt={recipe.name}
                                fill
                                className="object-cover rounded-xl"
                                placeholder="blur"
                                blurDataURL="/images/placeholder.png" // or base64
                            />
                        </Link>
                    )}
                    {
                        recipe.is_public &&
                        type === RecipeListType.COLLECTION &&
                        <Tag
                            title={recipe.is_public ? "Public Recipe" : "Private Recipe"}
                            customClass="absolute top-2 right-2 text-xs"
                        >public</Tag>
                    }
                </div>

                {recipe.categories && (
                    <div className="mt-2 flex flex-row overflow-scroll no-scrollbar gap-2 items-end">
                        {recipe.categories.map((category) => (
                            <Tag
                                key={category.id}
                                customClass="text-xs"
                                href={
                                    type === RecipeListType.COLLECTION ?
                                        `/collection?category=${category.name}` :
                                        `/explore?category=${category.name}`
                                }
                                isInverted={true}
                            > {category.name}</Tag>
                        ))
                        }
                    </div>
                )
                }

                <h2 className="text-xl font-semibold mt-3 leading-[1.4rem]">
                    {recipe.name}
                </h2>

                <p className="leading-tight text-sm text-text-light mt-2">{recipe.subtitle}</p>
            </div>

            {type === RecipeListType.EXPLORE && (
                <p className="leading-tight text-sm text-primary mt-2 underline " >{recipe.username}</p>
            )}

        </div >
    );
}
