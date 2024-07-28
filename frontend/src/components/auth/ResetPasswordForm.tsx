"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { resetPasswordSchema } from "@/schema";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";

export default function ResetPasswordForm() {
    const params = useSearchParams();
    const token = params.get("token");

    const [showPassword, setShowPassword] = useState(false);
    const form = useForm<z.infer<typeof resetPasswordSchema>>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
            token: token || "",
        },
    });

    async function onSubmit(data: z.infer<typeof resetPasswordSchema>) {
        form.setValue("token", token!);
        console.log(data);
    }
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 w-full max-w-96  xl:max-w-[500px] px-5"
            >
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
                    Reset Password
                </Button>
            </form>
        </Form>
    );
}
