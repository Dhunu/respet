import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";

import CategoryCarousel from "@/components/home/CategoryCarousel";
import { Button } from "@/components/ui/button";

export default function Home() {
    return (
        <div className="h-full w-full">
            <div className="w-full min-h-[50vh] sm:min-h-screen relative">
                <Image
                    src="/images/hero.png"
                    alt="hero image"
                    height={1080}
                    width={1920}
                    className="w-full h-full absolute top-0 left-0 object-cover -z-10"
                />
                <div className="absolute w-full h-full top-0 left-0 custom-hero-gradient" />
                <div className="absolute left-10 sm:left-20 lg:left-32 top-0 h-full flex items-center justify-center">
                    <h2 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-semibold ">
                        <span className="text-[#B5C18E]">
                            Master <br />
                            The Art Of <br />{" "}
                        </span>
                        <span className="text-[#F7DCB9]">
                            {" "}
                            Butter <br /> Chicken <br />{" "}
                        </span>
                        <span className="text-[#B5C18E]">Today!</span>
                    </h2>
                </div>
            </div>
            <div className="w-full h-full mt-10">
                <h2 className="text-2xl sm:text-4xl px-5 sm:px-10 mb-10 font-semibold text-primary w-[350px] sm:w-[500px] relative">
                    Explore our Categories
                    <Image
                        src="/images/brush-stroke.svg"
                        alt="brush stroke"
                        height={50}
                        width={300}
                        className="absolute sm:-bottom-4 right-10 sm:right-5 w-[150px] sm:w-[300px]"
                    />
                </h2>
                <CategoryCarousel />
            </div>
            <div className="w-full h-full pt-10 flex flex-wrap mb-20 lg:mb-32">
                <div className="w-full lg:w-1/2 flex items-center justify-center lg:translate-y-20 xl:translate-x-20">
                    <Image
                        src="/images/add-recipe.svg"
                        alt="add-recipe"
                        width={800}
                        height={800}
                        className="w-80 h-80 xl:w-[400px] xl:h-[400px]"
                    />
                </div>
                <div className="w-full lg:w-1/2 flex flex-col items-center mt-5 lg:mt-0 xl:-translate-x-20">
                    <h2 className="text-2xl sm:text-4xl px-5 sm:px-10 mb-10 font-semibold text-primary w-[300px] sm:w-[500px] relative ">
                        Add your own Recipe
                        <Image
                            src="/images/brush-stroke.svg"
                            alt="brush stroke"
                            height={50}
                            width={300}
                            className="absolute lg:-bottom-4 left-5 lg:left-0 w-[150px] sm:w-[300px] scale-x-[-1]"
                        />
                    </h2>
                    <p className="text-center lg:text-right w-2/3 text-lg text-primary lg:w-1/2">
                        Share your favorite recipes with our community! Fill out
                        the form with ingredients, instructions, and photos.
                        Edit or delete your recipes anytime. Inspire others with
                        your culinary creations!
                    </p>
                    <Button
                        size="lg"
                        className="ring-2 ring-offset-2 mt-10 w-1/2 text-2xl ring-primary bg-[#B5C18E] text-background"
                        asChild
                    >
                        <Link href="/add-recipe">Add My Recipe</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
