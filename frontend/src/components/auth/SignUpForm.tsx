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
import { signUpSchema } from "@/schema";
import { Input } from "../ui/input";
import { FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa";
import { useState, useTransition } from "react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignUpForm() {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [showPassword, setShowPassword] = useState(false);
    const form = useForm<z.infer<typeof signUpSchema>>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    function onSubmit(data: z.infer<typeof signUpSchema>) {
        startTransition(async () => {
            const res = await fetch("/api/auth/sign-up", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: data.name,
                    email: data.email,
                    password: data.password,
                }),
            });

            const values = await res.json();

            if (values.success) {
                router.push("/auth/sign-in");
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
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="John Doe" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
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
                            <FormLabel>Password</FormLabel>
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
                            <FormDescription className="text-xs text-muted-foreground">
                                Password must be at least 8 characters long
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
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
                                                "absolute right-2 top-1/2 -translate-y-1/2 text-lg text-muted-foreground cursor-pointer"
                                            )}
                                            onClick={() =>
                                                setShowPassword(false)
                                            }
                                        />
                                    ) : (
                                        <FaEye
                                            className={cn(
                                                "absolute right-2 top-1/2 -translate-y-1/2 text-lg text-muted-foreground cursor-pointer"
                                            )}
                                            onClick={() =>
                                                setShowPassword(true)
                                            }
                                        />
                                    )}
                                </div>
                            </FormControl>
                            <FormDescription className="text-xs text-muted-foreground">
                                Please confirm your password
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full">
                    {isPending ? (
                        <FaSpinner className="animate-spin" />
                    ) : (
                        "Sign Up"
                    )}
                </Button>
            </form>
            <div className="w-full mt-5">
                <p className="text-center text-muted-foreground text-sm">
                    Already have an account?{" "}
                    <Link
                        href="/auth/sign-in"
                        className="font-semibold text-primary"
                    >
                        Sign In
                    </Link>
                </p>
            </div>
        </Form>
    );
}
