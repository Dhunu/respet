import Image from "next/image";

import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import { Metadata } from "next";
import AuthHeader from "@/components/auth/Header";

export const metadata: Metadata = {
    title: "Forgot Password",
};

export default function ForgotPasswordPage() {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center">
            <AuthHeader
                title="Forgot Password?"
                description="Type your email to reset password"
                className="text-2xl sm:text-4xl"
            />
            <ForgotPasswordForm />
        </div>
    );
}
