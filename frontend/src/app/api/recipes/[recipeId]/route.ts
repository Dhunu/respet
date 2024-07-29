import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    req: NextRequest,
    { params }: { params: { recipeId: string } }
) {
    // Get the recipeId from the params
    const recipeId = params.recipeId;

    console.log({ api_recipe_recipeId: recipeId });

    if (!recipeId)
        return NextResponse.json(
            { message: "recipeId is required", recipe: null },
            { status: 400 }
        );

    const recipe = await db.recipie.findUnique({
        where: {
            id: recipeId,
        },
    });

    if (!recipe)
        return NextResponse.json(
            { message: "Recipe not found", recipe: null },
            { status: 404 }
        );

    return NextResponse.json(
        {
            message: "Recipe found",
            recipe,
        },
        {
            status: 200,
        }
    );
}
