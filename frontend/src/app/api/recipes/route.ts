import { authStatus } from "@/actions/auth";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const res = await authStatus();
    const {
        imageUrl,
        title,
        description,
        cookingTime,
        prepTime,
        servings,
        ingredients,
        steps,
    } = await req.json();

    if (
        !imageUrl ||
        !title ||
        !description ||
        !cookingTime ||
        !prepTime ||
        !servings ||
        !ingredients ||
        !steps
    ) {
        return NextResponse.json(
            { message: "Please fill all fields" },
            { status: 400 }
        );
    }

    if (res.status !== 200) {
        console.log(res);

        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const email = res.body.user?.email;

    const author = await db.user.findUnique({
        where: {
            email,
        },
    });

    console.log(author);

    if (!author)
        return NextResponse.json(
            { message: "User not found" },
            { status: 404 }
        );

    const recipe = await db.recipie.create({
        data: {
            image: imageUrl,
            title,
            description,
            cookingTime,
            prepTime,
            servings,
            ingredients,
            steps,
            authorId: author.id,
        },
    });

    return NextResponse.json({ recipe }, { status: 201 });
}

export async function GET() {
    const recipes = await db.recipie.findMany();

    return NextResponse.json({ recipes }, { status: 200 });
}
