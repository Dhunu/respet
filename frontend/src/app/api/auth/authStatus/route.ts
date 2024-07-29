import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { verify } from "jsonwebtoken";

export async function GET() {
    const cookie = cookies().get("ecowiser");

    if (!cookie) {
        return NextResponse.json(
            {
                success: false,
                message: "You are not logged in",
            },
            {
                status: 401,
            }
        );
    }

    const userData = verify(cookie.value, String(process.env.JWT_SECRET));

    console.log(userData);

    if (!userData) {
        return NextResponse.json(
            {
                success: false,
                message: "User data not found",
            },
            {
                status: 404,
            }
        );
    }

    const { name, email, exp } = userData as {
        name: string;
        email: string;
        exp: number;
    };

    if (Date.now() >= exp * 1000) {
        return NextResponse.json(
            {
                success: false,
                message: "Session expired",
            },
            {
                status: 401,
            }
        );
    }

    return NextResponse.json(
        {
            success: true,
            message: "You are logged in",
            user: {
                name,
                email,
            },
        },
        {
            status: 200,
        }
    );
}
