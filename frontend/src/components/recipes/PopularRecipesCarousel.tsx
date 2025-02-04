"use client";

import Link from "next/link";
import Image from "next/image";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

import { categories } from "@/constants";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { Card, CardContent } from "../ui/card";
import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";

export default function PopularRecipesCarousel({
    recipes,
}: {
    recipes: Recipe[];
}) {
    return (
        <Carousel
            opts={{
                align: "start",
            }}
            className="w-full my-5 md:my-10"
            orientation="horizontal"
        >
            <CarouselContent>
                {recipes.map((recipe, index) => {
                    const fullStars = Math.floor(recipe.rating);
                    const halfStar = recipe.rating % 1 > 0.5;
                    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
                    return (
                        <CarouselItem
                            key={recipe.id}
                            className={cn(
                                "basis-[66%] sm:basis-[38%] lg:basis-[28%] 2xl:basis-[22%] pr-5",
                                index === 0 && "ml-5 md:ml-10",
                                index === categories.length - 1 &&
                                    "mr-5 md:mr-10"
                            )}
                        >
                            <Link href={`/recipes/${recipe.id}`}>
                                <Card className="aspect-[2.8/4] bg-transparent ">
                                    <CardContent className="w-full h-full flex flex-col relative justify-end rounded-lg shadow-lg">
                                        <Image
                                            src={recipe.image}
                                            alt={recipe.title}
                                            width={500}
                                            height={1000}
                                            className="absolute top-0 left-0 w-full h-full object-cover -z-10 rounded-lg"
                                        />
                                        <div className="w-full h-full absolute z-10 bg-gradient-to-t from-black/70 via-black/40 to-black/10  top-0 left-0 rounded-lg" />

                                        <div className="w-full z-10 pb-6 lg:pb-10 pl-2 flex flex-col">
                                            <div className="flex justify-between items-end">
                                                <h3 className="text-2xl lg:text-3xl font-bold flex items-center text-[#F7DCB9]">
                                                    {recipe.title}
                                                </h3>

                                                <Badge className="h-10 border border-secondary">
                                                    {recipe.category}
                                                </Badge>
                                            </div>
                                            <div className="flex gap-2 items-center">
                                                <div className="flex">
                                                    {Array(fullStars).fill(
                                                        <FaStar className="text-secondary w-4 h-4" />
                                                    )}
                                                    {halfStar && (
                                                        <FaStarHalfAlt className="text-secondary w-4 h-4" />
                                                    )}
                                                    {Array(emptyStars).fill(
                                                        <FaRegStar className="text-secondary w-4 h-4" />
                                                    )}
                                                </div>
                                                <span className="font-semibold text-sm text-secondary">
                                                    {recipe.rating}
                                                </span>
                                            </div>
                                            <p className="text-sm text-background mt-5 h-10">
                                                {recipe.description}
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        </CarouselItem>
                    );
                })}
            </CarouselContent>
        </Carousel>
    );
}
