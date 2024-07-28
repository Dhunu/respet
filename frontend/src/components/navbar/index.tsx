import React from "react";
import Logo from "../Logo";
import Links from "./Links";

export default function Navbar() {
    return (
        <div className="w-full h-16 flex justify-between px-5 sm:px-10 bg-gradient-to-b from-[#914F1E]/90 via-[#914F1E]/60 to-transparent fixed z-40">
            <Logo />
            <Links />
        </div>
    );
}
