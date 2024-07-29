import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Toaster } from "react-hot-toast";

import "./globals.css";
import { cn } from "@/lib/utils";

const poppins = Poppins({
    subsets: ["latin"],
    variable: "--font-poppins",
    weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
    metadataBase: new URL("https://respet.vercel.app"),
    title: {
        default: "Respet - Get any recipe you want",
        template: "%s - Respet",
    },
    description:
        "Respet is a recipe sharing website where you can find and share a wide variety of delicious recipes. Whether you're a seasoned chef or just starting out in the kitchen, Respet has something for everyone. Discover new and exciting recipes from around the world, or share your own culinary creations with the community. With a user-friendly interface and a vast collection of recipes, Respet makes it easy to find inspiration for your next meal. Join our community of food enthusiasts and start exploring the world of flavors today!",
    twitter: {
        card: "summary_large_image",
    },
    openGraph: {
        title: {
            default: "Respet - Get any recipe you want",
            template: "%s | Respet",
        },
        description:
            "Respet is a recipe sharing website where you can find and share a wide variety of delicious recipes. Whether you're a seasoned chef or just starting out in the kitchen, Respet has something for everyone. Discover new and exciting recipes from around the world, or share your own culinary creations with the community. With a user-friendly interface and a vast collection of recipes, Respet makes it easy to find inspiration for your next meal. Join our community of food enthusiasts and start exploring the world of flavors today!",
        type: "website",
        locale: "en_IN",
        url: "https://respet.vercel.app",
        siteName: "Respet",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="scroll-smooth">
            <body
                className={cn(
                    "min-h-screen font-poppins antialiased",
                    poppins.variable
                )}
            >
                <Toaster />
                {children}
            </body>
        </html>
    );
}
