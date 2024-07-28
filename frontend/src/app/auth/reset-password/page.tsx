import { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";

import ResetPasswordForm from "@/components/auth/ResetPasswordForm";
import Loader from "@/components/Loader";
import AuthHeader from "@/components/auth/Header";

export const metadata: Metadata = {
    title: "Reset Password",
};

export default function ResetPasswordPage() {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center">
            <AuthHeader
                title="Reset Password"
                description="Enter your new password"
                className="text-2xl sm:text-4xl"
            />
            <Suspense fallback={<Loader />}>
                <ResetPasswordForm />
            </Suspense>
        </div>
    );
}
