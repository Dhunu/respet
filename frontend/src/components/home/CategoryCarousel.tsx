import { categories } from "@/constants";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import Link from "next/link";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function CategoryCarousel() {
    return (
        <Carousel
            opts={{
                align: "start",
            }}
            className="w-full my-5 md:my-10"
            orientation="horizontal"
        >
            <CarouselContent>
                {categories.map((category, index) => (
                    <CarouselItem
                        key={category.id}
                        className={cn(
                            "basis-[66%] sm:basis-[38%] lg:basis-[28%] 2xl:basis-[22%] pr-5",
                            index === 0 && "ml-5 md:ml-10",
                            index === categories.length - 1 && "mr-5 md:mr-10"
                        )}
                    >
                        <Link href={`/category/${category.id}`}>
                            <Card className="aspect-[2.8/4] bg-transparent ">
                                <CardContent className="w-full h-full flex flex-col relative justify-end rounded-lg">
                                    <Image
                                        src={category.image}
                                        alt={category.name}
                                        width={500}
                                        height={1000}
                                        className="absolute top-0 left-0 w-full h-full object-cover -z-10 rounded-lg"
                                    />
                                    <div className="w-full h-full absolute z-10 bg-black/40 to-transparent top-0 left-0 rounded-lg" />

                                    <h3 className="text-2xl lg:text-3xl font-bold flex items-center text-[#F7DCB9] z-10 pb-6 lg:pb-10 pl-2">
                                        {category.name}
                                    </h3>
                                </CardContent>
                            </Card>
                        </Link>
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    );
}
