import React, { Suspense } from 'react';
import Link from 'next/link';
import Image from "next/image";

import type { RecipeListItem } from '@/types/recipe';
import { RecipeListType } from '@/types/general';

import Tag from '../general/Tag';
import PrivacyIcon from '../general/PrivacyIcon';

export default function RecipeCard({ recipe, type }: { recipe: RecipeListItem, type: RecipeListType }) {

    return (
        <div
            className="flex flex-col h-full justify-between group">
            <div>

                <div className="relative aspect-square bg-gray-500 sm:rounded-xl rounded-lg overflow-hidden">
                    {recipe.image_uri && (
                        <Link
                            href={
                                type === RecipeListType.COLLECTION
                                    ? `/collection/${recipe.slug}`
                                    : `/explore/${recipe.slug}`
                            }
                            scroll={true}
                            className="block relative w-full h-full"
                        >
                            <Image
                                src={recipe.image_uri}
                                alt={recipe.name}
                                fill
                                sizes="50vw"
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                placeholder="blur"
                                blurDataURL="/images/placeholder.png"
                            />
                        </Link>
                    )}

                    {recipe.is_public && type === RecipeListType.COLLECTION && (
                        <PrivacyIcon isPublic={recipe.is_public} />
                    )}
                </div>



                <h2 className="sm:text-xl text-md font-semibold mt-3 leading-[1.4rem]">
                    {recipe.name}
                </h2>

                <p className="leading-tight sm:text-sm text-xs text-text-light sm:mt-2 mt-1">{recipe.subtitle}</p>
            </div>

            {type === RecipeListType.EXPLORE && (
                <a className="leading-tight sm:text-sm text-xs text-primary sm:mt-2 underline" href={`/explore?query=${recipe.username}`}>{recipe.username}</a>
            )}

            {recipe.categories && (
                <div className="mt-2 flex flex-row overflow-scroll no-scrollbar gap-2 items-end">
                    {recipe.categories.map((category) => (
                        <Tag
                            key={category.id}
                            customClass="text-xs"
                            color='white'
                            href={
                                type === RecipeListType.COLLECTION ?
                                    `/collection?category=${category.name}` :
                                    `/explore?category=${category.name}`
                            }
                        > {category.name}</Tag>
                    ))
                    }
                </div>
            )
            }

        </div >
    );
}
