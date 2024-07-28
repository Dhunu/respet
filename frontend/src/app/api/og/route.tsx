import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

//Route segment config
export const runtime = "edge";

// Route handler
export async function GET(req: NextRequest) {
    // Get the title from the query string
    const { searchParams } = req.nextUrl;
    const postTitle = searchParams.get("title");
    const postDescription = searchParams.get("description");

    // Get font from specified URL
    const font = fetch(
        new URL("../../../../public/fonts/outfit-semibold.ttf", import.meta.url)
    ).then((res) => res.arrayBuffer());
    const fontData = await font;

    // Create a ImageResponse with dynamic content
    return new ImageResponse(
        (
            <div
                style={{
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundImage: `url(${process.env.NEXT_PUBLIC_BASE_URL}/images/hero.png)`,
                }}
            >
                <div
                    style={{
                        width: "100%",
                        height: "100%",
                        position: "absolute",
                        top: 0,
                        left: 0,
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                    }}
                />
                <div
                    style={{
                        fontSize: 140,
                        fontFamily: "Outfit",
                        letterSpacing: "-0.05em",
                        fontStyle: "normal",
                        color: "white",
                        lineHeight: "120px",
                        whiteSpace: "pre-wrap",
                        textAlign: "center",
                    }}
                >
                    {postTitle}
                </div>
                <div
                    style={{
                        fontSize: 60,
                        fontFamily: "Outfit",
                        letterSpacing: "-0.05em",
                        fontStyle: "normal",
                        color: "white",
                        lineHeight: "120px",
                        whiteSpace: "pre-wrap",
                        textAlign: "center",
                    }}
                >
                    {postDescription}
                </div>
            </div>
        ),
        // ImageResponse options
        {
            width: 1920,
            height: 1080,
            fonts: [
                {
                    name: "Outfit",
                    data: fontData,
                    style: "normal",
                },
            ],
        }
    );
}
