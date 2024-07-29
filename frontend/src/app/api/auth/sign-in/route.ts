import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { db } from "@/lib/db";
import { createToken } from "@/lib/utils";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
    // Get data from the request
    const { email, password } = await request.json();

    console.log({ email, password });

    // Check if the required fields are present
    if (!email || !password) {
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

    // Check if user exists
    const user = await db.user.findFirst({
        where: {
            email,
        },
    });

    if (!user) {
        return NextResponse.json(
            {
                success: false,
                message: "User not found",
            },
            {
                status: 404,
            }
        );
    }

    // Check if password is correct
    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
        return NextResponse.json(
            {
                success: false,
                message: "Invalid credentials",
            },
            {
                status: 401,
            }
        );
    }

    // Create a token
    const token = createToken(user.name, user.email);

    //Set the token in the cookie
    cookies().set("ecowiser", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 60 * 60 * 24, // 1 day
    });

    return NextResponse.json(
        {
            success: true,
            message: "User logged in",
        },
        { status: 200 }
    );
}
