"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaPlus } from "react-icons/fa";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "../ui/navigation-menu";
import React from "react";
import ProfileLink from "./ProfileLink";
import { Button } from "../ui/button";

export default function Links() {
    const pathname = usePathname();
    const profileLinks = [
        {
            title: "Dashboard",
            href: "/dashboard",
        },
        {
            title: "Profile",
            href: "/profile",
        },
    ];
    return (
        <div className="lg:w-[500px] flex justify-between items-center font-semibold text-[#F7DCB9]/70">
            <Link
                href="/"
                className={cn(
                    "hidden lg:block",
                    pathname === "/" &&
                        " underline underline-offset-8 text-[#F7DCB9]"
                )}
            >
                HOME
            </Link>
            <Link
                href="/recipes"
                className={cn(
                    "hidden lg:block",
                    pathname === "/recipes" &&
                        " underline underline-offset-8 text text-[#F7DCB9]"
                )}
            >
                RECIPE
            </Link>
            <Link
                href="/add-recipe"
                className="hidden lg:flex gap-2 items-center bg-[#B5C18E] py-2 px-4 rounded-lg text-primary/80"
            >
                <FaPlus className="h-4 w-4" />
                RECIPE
            </Link>
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger>
                            <div className="relative w-10 h-10 flex items-center justify-center group">
                                <div className="absolute top-0 left-0 rounded-full bg-[#B5C18E] group-hover:bg-gradient-to-t from-[#B5C18E]  to-primary w-10 h-10 z-0 animate-spin-slow" />
                                <div className="z-10 w-9 h-9 bg-secondary rounded-full">
                                    <Image
                                        src="/images/avatar.jpg"
                                        width={32}
                                        height={32}
                                        className="w-full h-full rounded-full"
                                        alt="profile"
                                    />
                                </div>
                            </div>
                        </NavigationMenuTrigger>

                        <NavigationMenuContent>
                            <ul className="flex flex-col gap-2 w-60 px-4 py-2">
                                {profileLinks.map((link) => (
                                    <ProfileLink
                                        key={link.title}
                                        title={link.title}
                                        href={link.href}
                                    />
                                ))}
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="bg-primary text-background hover:bg-primary/90 hover:text-background/90"
                                >
                                    Logout
                                </Button>
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    );
}
