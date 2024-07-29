"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FaTrash } from "react-icons/fa";
import { useState } from "react";
import Image from "next/image";
import { TagsInput } from "react-tag-input-component";

import { addRecipeSchema } from "@/schema";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import DropzoneConponent from "../DropzoneConponent";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function AddRecipeForm({ email }: { email: string }) {
    const router = useRouter();
    const [step, setStep] = useState("");

    const form = useForm<z.infer<typeof addRecipeSchema>>({
        resolver: zodResolver(addRecipeSchema),
        defaultValues: {
            imageUrl: "",
            title: "",
            description: "",
            cookingTime: 0,
            prepTime: 0,
            servings: 0,
            ingredients: [],
            steps: [],
        },
    });

    async function addStep() {
        if (step.length >= 3) {
            form.setValue("steps", [...form.getValues("steps"), step]);
            setStep("");
        }
    }

    async function deleteStep(i: number) {
        form.setValue(
            "steps",
            form.getValues("steps").filter((step, index) => index !== i)
        );
    }

    async function onSumbit(values: z.infer<typeof addRecipeSchema>) {
        console.log(values);

        const res = await fetch("/api/recipe", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        });

        const data = await res.json();

        console.log(data);

        if (res.status === 201) {
            toast.success("Recipe added successfully!");
            form.reset();
            router.push(`/recipes/${data.recipe.id}`);
        }
    }
    return (
        <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(onSumbit)}>
                {form.getValues("imageUrl") ? (
                    <div className="w-full h-52">
                        <Image
                            src={form.getValues("imageUrl")}
                            height={280}
                            width={500}
                            className="object-contain w-full h-full"
                            alt={form.getValues("title") || "Recipe image"}
                        />
                    </div>
                ) : (
                    <FormField
                        control={form.control}
                        name="imageUrl"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Upload Image</FormLabel>
                                <FormControl>
                                    <DropzoneConponent
                                        email={email}
                                        onChange={field.onChange}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}

                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder="Cheesecake"
                                    className="border-none"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea
                                    {...field}
                                    className="h-40 border-none"
                                    placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. "
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="grid grid-cols-1 md:grid-cols-3 space-y-6 md:space-y-0 md:space-x-6">
                    <FormField
                        control={form.control}
                        name="cookingTime"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Cooking Time (in minutes)</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Input
                                            {...field}
                                            type="number"
                                            placeholder="50"
                                            className="border-none"
                                        />
                                        <div className="absolute inset-y-0 right-10 flex items-center text-secondary">
                                            minutes
                                        </div>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="prepTime"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Prep Time (in minutes)</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Input
                                            {...field}
                                            type="number"
                                            placeholder="10"
                                            className="border-none"
                                        />
                                        <div className="absolute inset-y-0 right-10 flex items-center text-secondary">
                                            minutes
                                        </div>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="servings"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Servings</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="number"
                                        className="border-none"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="ingredients"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Ingredients</FormLabel>
                            <FormControl>
                                <TagsInput
                                    value={field.value}
                                    onChange={field.onChange}
                                    name="ingredients"
                                    placeHolder="Add Ingredient"
                                    onExisting={(tag) => tag}
                                    classNames={{
                                        input: "bg-background text-primary rounded-md placeholder:text-secondary",
                                    }}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="steps"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Steps</FormLabel>
                            <FormControl>
                                <div className="flex flex-col gap-5">
                                    <div className="flex gap-5">
                                        <Input
                                            onChange={(e) =>
                                                setStep(e.target.value)
                                            }
                                            value={step}
                                            className="border-none"
                                        />
                                        <Button type="button" onClick={addStep}>
                                            Add Step
                                        </Button>
                                    </div>
                                    <div className="flex gap-5 flex-col h-40 overflow-y-scroll border rounded-md p-2">
                                        {field.value.map((step, index) => (
                                            <div
                                                key={index}
                                                className="p-2 flex items-center shadow-md rounded-md text-primary text-sm"
                                            >
                                                <span className="mr-2 font-semibold">
                                                    {index + 1}
                                                    {")"}
                                                </span>
                                                <span className="w-full">
                                                    {step}
                                                </span>
                                                <FaTrash
                                                    className="cursor-pointer ml-2 text-primary"
                                                    onClick={() =>
                                                        deleteStep(index)
                                                    }
                                                />
                                            </div>
                                        ))}
                                        {field.value.length === 0 && (
                                            <div className="text-primary text-center text-sm">
                                                No steps added yet
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit">Add Recipe</Button>
            </form>
        </Form>
    );
}
