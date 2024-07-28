import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { db } from "@/lib/db";

export async function POST(request: NextRequest) {
    // Get data from the request
    const { name, email, password } = await request.json();

    // Check if the required fields are present
    if (!name || !email || !password) {
        return NextResponse.json(
            {
                success: false,
                message: "Please provide all fields",
            },
            {
                status: 400,
            }
        );
    }

    // Check if user already exists
    const user = await db.user.findFirst({
        where: {
            email,
        },
    });

    if (user) {
        return NextResponse.json(
            {
                success: false,
                message: "User already exists",
            },
            {
                status: 400,
            }
        );
    }

    // Hash the password
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Create the user
    await db.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        },
    });

    return NextResponse.json(
        {
            success: true,
            message: "User created",
        },
        { status: 201 }
    );
}
