import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import jwt from "jsonwebtoken";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function createToken(name: string, email: string) {
    return jwt.sign({ name, email }, process.env.JWT_SECRET!, {
        expiresIn: "1d",
    });
}

export function decodeToken(token: string) {
    return jwt.verify(token, process.env.JWT_SECRET!);
}
