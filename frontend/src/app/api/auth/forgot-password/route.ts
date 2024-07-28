import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    // Get data from request
    const { email } = await request.json();

    // Check if the required fields are present
    if (!email) {
        return NextResponse.json(
            {
                success: false,
                message: "Please provide an email",
            },
            {
                status: 400,
            }
        );
    }

    // Send email

    return NextResponse.json(
        {
            success: true,
            message: "Email sent",
        },
        {
            status: 200,
        }
    );
}
