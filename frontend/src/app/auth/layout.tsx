import Image from "next/image";
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
    return (
        <div className="h-screen w-full flex">
            <div className="hidden lg:flex w-1/2 items-center justify-center">
                <Image
                    src="/images/auth.svg"
                    alt="auth-logo"
                    width={1000}
                    height={1000}
                    className="object-contain w-full h-2/3"
                />
            </div>
            <div className="w-full lg:w-1/2 py-10">{children}</div>
        </div>
    );
}
