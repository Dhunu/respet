import { Metadata } from "next";
import Image from "next/image";

import SignInForm from "@/components/auth/SignInForm";
import AuthHeader from "@/components/auth/Header";

export const metadata: Metadata = {
    title: "Sign In",
};

export default function SignInPage() {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center">
            <AuthHeader title="Sign In" description="Welcome back!" />
            <SignInForm />
        </div>
    );
}
