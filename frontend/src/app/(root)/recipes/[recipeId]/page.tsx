import { Metadata } from "next";
import Image from "next/image";

export async function generateMetadata({
    params,
}: {
    params: { recipeId: string };
}): Promise<Metadata> {
    // Get the recipeId from the params
    const recipeId = params.recipeId;

    console.log({ website_recipeId: recipeId });

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/recipes/${recipeId}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }
    );

    const recipe = await res.json();
    const title = recipe?.name;
    const description = recipe?.description;
    return {
        title,
        description,
        openGraph: {
            title,
            description,
            images: [
                {
                    url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/og?title=${title}&description=${description}`,
                    width: 1200,
                    height: 630,
                },
            ],
            type: "website",
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/recipes/${recipeId}`,
        },
    };
}

export default async function RecipePage({
    params,
}: {
    params: { recipeId: string };
}) {
    const recipeId = params.recipeId;

    const data = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/recipes/${recipeId}`
    ).then((res) => res.json());

    const recipe = data.recipe;

    console.log({ recipe });

    return (
        <div className="w-full h-full pt-32">
            <div className="w-full flex flex-wrap mx-auto px-10 sm:px-20 lg:px-32">
                <div className="w-full md:w-1/2 xl:max-w-screen-sm">
                    <h1 className=" text-5xl sm:text-6xl lg:text-7xl xl:text-8xl mb-10 font-semibold text-primary w-[250px] sm:w-[350px] lg:w-[400px] xl:w-[500px] relative">
                        <span className="z-10">{recipe.title}</span>
                        <Image
                            src="/images/brush-stroke.svg"
                            alt="brush stroke"
                            height={50}
                            width={300}
                            className="absolute sm:-bottom-5 right-6 w-[200px] sm:w-[300px] lg:w-[350px] xl:w-[450px] -z-10"
                        />
                    </h1>
                    <p className="text-primary font-medium  pt-10 lg:text-xl xl:text-2xl">
                        {recipe.description}
                    </p>
                </div>
            </div>
            <Image
                src={recipe.image}
                alt={recipe.title}
                width={1920}
                height={1080}
                className="object-contain w-full h-full mt-10  px-5 sm:px-10 rounded-[10vw]"
            />
            <div className="w-full px-5 md:mx-10">
                <div className="w-full flex items-center my-5 sm:my-10">
                    <div className="w-40 flex flex-col items-center">
                        <h4 className="text-base text-primary font-semibold">
                            COOKING TIME
                        </h4>
                        <p className="text-sm font-medium text-secondary">
                            {recipe.cookingTime} MIN
                        </p>
                    </div>
                    <div className="w-40 flex flex-col items-center">
                        <h4 className="text-base text-primary font-semibold">
                            PREP TIME
                        </h4>
                        <p className="text-sm font-medium text-secondary">
                            {recipe.prepTime} MIN
                        </p>
                    </div>
                    <div className="w-40 flex flex-col items-center">
                        <h4 className="text-base text-primary font-semibold">
                            SERVINGS
                        </h4>
                        <p className="text-sm font-medium text-secondary">
                            {recipe.servings} PEOPLE
                        </p>
                    </div>
                </div>
                <div className="w-full flex flex-wrap gap-10 my-5 sm:my-10">
                    <div className="w-full md:w-[45%]">
                        <h1 className="text-xl sm:text-2xl font-semibold text-primary">
                            Ingredients
                        </h1>
                        <ol className="flex flex-col gap-5 list-disc translate-x-5 mt-5">
                            {recipe.ingredients.map((ingredient: string) => (
                                <li className="text-primary font-semibold">
                                    {ingredient}
                                </li>
                            ))}
                        </ol>
                    </div>
                    <div className="w-full flex-1">
                        <h1 className="text-xl sm:text-2xl font-semibold text-primary">
                            Instructions
                        </h1>
                        <ol className="flex flex-col gap-5 list-disc translate-x-5 mt-5">
                            {recipe.steps.map((ingredient: string) => (
                                <li className="text-primary font-semibold">
                                    {ingredient}
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    );
}
