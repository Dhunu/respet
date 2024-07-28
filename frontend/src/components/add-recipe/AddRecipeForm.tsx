"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FaTrash } from "react-icons/fa";

import { addRecipeSchema } from "@/schema";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { Textarea } from "../ui/textarea";
import { WithContext as ReactTags, SEPARATORS } from "react-tag-input";
import { TagsInput } from "react-tag-input-component";

export default function AddRecipeForm() {
    const [ingredient, setIngredient] = useState("");
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

    async function addIngredient() {
        if (ingredient.length >= 3) {
            form.setValue("ingredients", [
                ...form.getValues("ingredients"),
                ingredient,
            ]);
            setIngredient("");
        }
    }

    async function deleteIngredient(i: number) {
        form.setValue(
            "ingredients",
            form
                .getValues("ingredients")
                .filter((ingredient, index) => index !== i)
        );
    }

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

    async function onSumbit(data: z.infer<typeof addRecipeSchema>) {
        console.log(data);
    }
    return (
        <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(onSumbit)}>
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
                        </FormItem>
                    )}
                />

                <Button type="submit">Add Recipe</Button>
            </form>
        </Form>
    );
}
