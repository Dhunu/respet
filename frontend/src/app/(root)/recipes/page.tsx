import PopularRecipesCarousel from "@/components/recipes/PopularRecipesCarousel";
import Image from "next/image";

export default async function RecipesPage() {
    // const res = await fetch("http://127.0.0.1:8001/api/hello");
    // const data = await res.json();

    // console.log(data);

    return (
        <div className="w-full h-full pt-32">
            <div className="w-full flex flex-wrap max-h-[800px] md:h-[70vh] mx-auto px-10 sm:px-20 lg:px-32">
                <div className="w-full md:w-1/2 xl:max-w-screen-sm">
                    <h1 className=" text-5xl sm:text-6xl lg:text-7xl xl:text-8xl mb-10 font-semibold text-primary w-[250px] sm:w-[350px] lg:w-[400px] xl:w-[500px] relative">
                        <span className="z-10">Recipes</span>
                        <Image
                            src="/images/brush-stroke.svg"
                            alt="brush stroke"
                            height={50}
                            width={300}
                            className="absolute sm:-bottom-5 right-6 w-[200px] sm:w-[300px] lg:w-[350px] xl:w-[450px] -z-10"
                        />
                    </h1>
                    <p className="text-primary font-medium  pt-10 lg:text-xl xl:text-2xl">
                        Discover a world of delicious recipes! Browse through a
                        variety of categories, from appetizers to desserts. Find
                        inspiration for your next meal and enjoy detailed
                        instructions, ingredient lists, and mouth-watering
                        photos. Happy cooking!
                    </p>
                </div>
                <div className="w-full md:w-1/2 my-10 md:my-0 mx-10 sm:mx-0">
                    <Image
                        src="/images/recipes-hero.png"
                        alt="recipes-hero"
                        width={1920}
                        height={1080}
                        className="object-contain w-full h-full max-w-screen-sm mx-auto md:pl-10"
                    />
                </div>
            </div>

            <div className="mt-10 md:mt-0">
                <h2 className="text-2xl sm:text-4xl px-5 sm:px-10 mb-10 font-semibold text-primary w-[150px] sm:w-[250px] relative">
                    Popular
                    <Image
                        src="/images/brush-stroke.svg"
                        alt="brush stroke"
                        height={50}
                        width={300}
                        className="absolute sm:-bottom-2 right-5 sm:right-10  w-[120px] sm:w-[180px]"
                    />
                </h2>
                <PopularRecipesCarousel />
            </div>
            <div className="mt-32">
                <h2 className="text-2xl sm:text-4xl px-5 sm:px-10 mb-10 font-semibold text-primary w-[330px] sm:w-[500px] relative">
                    Recommended for you
                    <Image
                        src="/images/brush-stroke.svg"
                        alt="brush stroke"
                        height={50}
                        width={300}
                        className="absolute sm:-bottom-2 right-5 sm:right-10  w-[120px] sm:w-[180px]"
                    />
                </h2>
                <PopularRecipesCarousel />
            </div>
            <div className="mt-32 mb-20">
                <h2 className="text-2xl sm:text-4xl px-5 sm:px-10 mb-10 font-semibold text-primary w-[330px] sm:w-[530px] relative">
                    Popular Amongst Chefs
                    <Image
                        src="/images/brush-stroke.svg"
                        alt="brush stroke"
                        height={50}
                        width={300}
                        className="absolute sm:-bottom-2 right-5 sm:right-10  w-[120px] sm:w-[180px]"
                    />
                </h2>
                <PopularRecipesCarousel />
            </div>
        </div>
    );
}
