import { z } from "zod";

export const usernameSchema = z.string();
export const emailSchema = z
    .string()
    .email({ message: "Invalid email address" });

export const passwordSchema = z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(20, "Password cannot exceed 20 characters");

export const fullNameSchema = z
    .string()
    .min(3, { message: "Full name must be at least 3 characters long" })
    .refine((value) => {
        const trimmedValue = value.trim();
        const spaceIndex = trimmedValue.indexOf(" ");
        return spaceIndex > 0 && spaceIndex < trimmedValue.length - 1;
    }, "Fullname should have at least one space between first and last name");

export const LoginSchema = z.object({
    email: emailSchema,
    password: passwordSchema,
});

export const SingUpSchema = z.object({
    email: emailSchema,
    username: usernameSchema,
    password: passwordSchema,
});
