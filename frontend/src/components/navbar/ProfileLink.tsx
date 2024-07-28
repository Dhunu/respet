import Link from "next/link";
import React from "react";

export default function ProfileLink({
    title,
    href,
}: {
    title: string;
    href: string;
}) {
    return (
        <Link
            href={href}
            className="border border-primary/20 rounded-lg py-2 text-center hover:bg-primary/10"
        >
            {title}
        </Link>
    );
}
