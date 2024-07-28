import Image from "next/image";

import SignUpForm from "@/components/auth/SignUpForm";
import { Metadata } from "next";
import AuthHeader from "@/components/auth/Header";

export const metadata: Metadata = {
    title: "Sign Up",
};

export default function SignUpPage() {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center">
            <AuthHeader
                title="Sign Up"
                description="Share your own recipes with the world"
            />
            <SignUpForm />
        </div>
    );
}
