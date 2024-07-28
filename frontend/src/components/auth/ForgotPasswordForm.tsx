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
import { forgotPasswordSchema } from "@/schema";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";

export default function ForgotPasswordForm() {
    const form = useForm<z.infer<typeof forgotPasswordSchema>>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: "",
        },
    });

    async function onSubmit(data: z.infer<typeof forgotPasswordSchema>) {
        console.log(data);
    }
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 w-full max-w-96 xl:max-w-[500px] px-5"
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
                <Button type="submit" className="w-full">
                    Send Email
                </Button>
            </form>
            <div className="w-full mt-5 text-center">
                <Button variant="link" className="text-sm" asChild>
                    <Link href="/auth/sign-in">Back to Sign In</Link>
                </Button>
            </div>
        </Form>
    );
}
