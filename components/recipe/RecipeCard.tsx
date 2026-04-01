import React from 'react';
import Link from 'next/link';

import type { RecipeListItem } from '@/types/recipe';

import Tag from '../general/Tag';


export default function RecipeCard({ recipe }: { recipe: RecipeListItem }) {
    return (
        <Link href={`/collection/${recipe.slug}`}
            className="flex flex-col h-full">

            <div className="relative aspect-square">

                {recipe.image_uri && (
                    <img src={recipe.image_uri} alt={recipe.name} className="min-w-full min-h-full h-48 rounded-xl object-cover" />
                )}
                {/* <p className="absolute top-3 right-3">{recipe.is_public ? 'Public' : 'Private'}</p> */}
                {recipe.is_public &&
                    <Tag
                        title={recipe.is_public ? "Public Recipe" : "Private Recipe"}
                        customClass="absolute top-2 right-2 text-xs"
                    >public</Tag>
                }
            </div>

            {recipe.categories && (
                <div className="mt-2 flex flex-row overflow-scroll no-scrollbar gap-2 flex-1 items-end">
                    {recipe.categories.map((category) => (
                        <Tag
                            key={category.id}
                            customClass="text-xs"
                            isInverted={true}
                        >{category.name}</Tag>
                    ))
                    }
                </div>
            )}

            <h2 className="text-xl font-semibold mt-3 leading-[1.4rem]">
                {recipe.name}
            </h2>

            <p className="leading-tight text-sm text-text-light mt-2">{recipe.subtitle}</p>



        </Link>
    );
}
