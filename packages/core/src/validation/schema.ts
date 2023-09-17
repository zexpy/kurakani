import { z } from "zod";

export const usernameSchema = z
  .string()
  .min(5, { message: "Username must be at least 5 characters" });
export const emailSchema = z
  .string()
  .email({ message: "Invalid Email Address" });

export const passwordSchema = z
  .string()
  .min(6, "Password must be at least 6 characters")
  .max(20, "Password cannot exceed 20 characters");

export const fullNameSchema = z
  .string()
  .min(3, { message: "Full name must be at least 3 characters" })
  .refine((value) => {
    const trimmedValue = value.trim();
    const spaceIndex = trimmedValue.indexOf(" ");
    return spaceIndex > 0 && spaceIndex < trimmedValue.length - 1;
  }, "Fullname should have at least one space between first and last name");

export const LoginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});
export type ILoginCreds = z.infer<typeof LoginSchema>;

export const SignUpSchema = z
  .object({
    email: emailSchema,
    username: usernameSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
export type ISignUpCreds = z.infer<typeof SignUpSchema>;

export const UpdateSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: emailSchema,
  address: z.string(),
  dob: z.string().optional(),
});

export type IUpadateCreds = z.infer<typeof UpdateSchema>;
