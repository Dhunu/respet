import Image from "next/image";
import React from "react";

export default function Logo() {
    return (
        <div className="w-20 h-16 flex items-center">
            <Image
                src="/images/logo-light.svg"
                alt="logo"
                width={35}
                height={35}
                className="text-secondary"
            />
            <h1 className="hidden sm:block text-2xl font-bold ml-2 text-[#F7DCB9]">
                Respet
            </h1>
        </div>
    );
}
