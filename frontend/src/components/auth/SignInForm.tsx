"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { signInSchema } from "@/schema";
import { Input } from "../ui/input";
import { FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa";
import { useState, useTransition } from "react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function SignInForm() {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const form = useForm<z.infer<typeof signInSchema>>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    function onSubmit(values: z.infer<typeof signInSchema>) {
        startTransition(async () => {
            const response = await fetch("/api/auth/sign-in", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });

            const data = await response.json();

            if (!data.success) {
                toast.error(data.message);
            } else {
                setErrorMessage(null);
                router.push("/");
            }
        });
    }
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 w-full max-w-96  xl:max-w-[500px] px-5"
            >
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder="johndoe@example.com"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                <div className="w-full flex justify-between items-center">
                                    Password
                                    <Link
                                        href="/auth/forgot-password"
                                        className="text-xs text-primary font-semibold"
                                    >
                                        Forgot Password?
                                    </Link>
                                </div>
                            </FormLabel>
                            <FormControl>
                                <div className="relative flex items-center">
                                    <Input
                                        {...field}
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        className="pr-10"
                                    />
                                    {showPassword ? (
                                        <FaEyeSlash
                                            className={cn(
                                                "absolute right-2 top-1/2 -translate-y-1/2 text-lg text-primary cursor-pointer"
                                            )}
                                            onClick={() =>
                                                setShowPassword(false)
                                            }
                                        />
                                    ) : (
                                        <FaEye
                                            className={cn(
                                                "absolute right-2 top-1/2 -translate-y-1/2 text-lg text-primary cursor-pointer"
                                            )}
                                            onClick={() =>
                                                setShowPassword(true)
                                            }
                                        />
                                    )}
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full">
                    {isPending ? (
                        <FaSpinner className="animate-spin" />
                    ) : (
                        "Sign In"
                    )}
                </Button>
                {errorMessage && (
                    <FormDescription className="text-red-500">
                        {errorMessage}
                    </FormDescription>
                )}
            </form>
            <div className="w-full mt-5">
                <p className="text-center text-muted-foreground text-sm">
                    Don&apos;t have an account?{" "}
                    <Link
                        href="/auth/sign-up"
                        className="font-semibold text-primary"
                    >
                        Sign Up
                    </Link>
                </p>
            </div>
        </Form>
    );
}
