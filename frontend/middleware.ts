import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decodeToken } from "./src/lib/utils";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const cookie = request.cookies.get("ecowiser");

    if (cookie && request.nextUrl.pathname.startsWith("/auth")) {
        return NextResponse.redirect(new URL("/", request.nextUrl));
    } else if (cookie) {
        return NextResponse.next();
    }

    if (
        request.nextUrl.pathname.startsWith("/api") ||
        request.nextUrl.pathname.startsWith("/auth") ||
        request.nextUrl.pathname === "/"
    ) {
        return NextResponse.next();
    }

    return NextResponse.redirect(new URL("/auth/sign-in", request.nextUrl));
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
