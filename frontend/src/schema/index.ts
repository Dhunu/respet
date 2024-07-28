import { z } from "zod";

export const signUpSchema = z
    .object({
        name: z
            .string()
            .min(3, {
                message: "Name must be at least 3 characters long",
            })
            .max(255, { message: "Name must be at most 255 characters long" }),
        email: z.string().email({ message: "Invalid email address" }),
        password: z
            .string()
            .min(8, {
                message: "Password must be at least 8 characters long",
            })
            .max(255, {
                message: "Password must be at most 255 characters long",
            }),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

export const signInSchema = z.object({
    username: z.string(),
    password: z.string(),
});

export const forgotPasswordSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
});

export const resetPasswordSchema = z
    .object({
        password: z
            .string()
            .min(8, {
                message: "Password must be at least 8 characters long",
            })
            .max(255, {
                message: "Password must be at most 255 characters long",
            }),
        confirmPassword: z.string(),
        token: z.string().min(1, {
            message: "Token is required",
        }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

export const addRecipeSchema = z.object({
    imageUrl: z.string().url({ message: "Invalid image URL" }),
    title: z
        .string()
        .min(3, { message: "Title must be at least 3 characters long" }),
    description: z
        .string()
        .min(3, { message: "Description must be at least 3 characters long" }),
    cookingTime: z.number().int().positive(),
    prepTime: z.number().int().positive(),
    servings: z.number().int().positive(),
    ingredients: z.array(
        z.string().min(3, {
            message: "Ingredient must be at least 3 characters long",
        })
    ),
    steps: z.array(
        z.string().min(3, {
            message: "Instruction must be at least 3 characters long",
        })
    ),
});

export const updateRecipeSchema = z.object({
    title: z
        .string()
        .min(3, { message: "Title must be at least 3 characters long" }),
    description: z
        .string()
        .min(3, { message: "Description must be at least 3 characters long" }),
    ingredients: z.array(
        z.string().min(3, {
            message: "Ingredient must be at least 3 characters long",
        })
    ),
    instructions: z.array(
        z.string().min(3, {
            message: "Instruction must be at least 3 characters long",
        })
    ),
});
