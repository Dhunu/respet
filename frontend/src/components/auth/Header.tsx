import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

export default function AuthHeader({
    title,
    description,
    className,
}: {
    title: string;
    description?: string;
    className?: string;
}) {
    return (
        <div className="w-full flex flex-col items-center mb-10">
            <Image src="/images/logo.svg" alt="logo" width={50} height={50} />

            <h1
                className={cn(
                    "text-3xl sm:text-5xl font-bold mt-10 text-primary/90",
                    className
                )}
            >
                {title}
            </h1>
            <p className="text-sm mt-1 text-muted-foreground">{description}</p>
        </div>
    );
}
