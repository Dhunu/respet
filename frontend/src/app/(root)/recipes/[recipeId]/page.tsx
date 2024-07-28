import { recipies } from "@/constants";
import { Metadata } from "next";

export async function generateMetadata({
    params,
}: {
    params: { recipeId: string };
}): Promise<Metadata> {
    const recipeId = params.recipeId;

    console.log({ recipeId });

    const recipe = recipies.find((recipe) => recipe.id === recipeId);

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

export default function RecipePage({
    params,
}: {
    params: { recipeId: string };
}) {
    const recipeId = params.recipeId;

    return <div>RecipePage: {recipeId}</div>;
}
