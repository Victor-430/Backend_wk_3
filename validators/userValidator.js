import z from "zod"

export const loginSchema = z.object({
    email: z.email({ invalid_type_error: "Email is required" }).min(1, "Email is required"),
    password: z.string({ invalid_type_error: "Password is required" }).min(1, "Password is required"),
})

export const registerSchema = z.object({
    username: z.string({ invalid_type_error: "username is required" }).min(1, "Username is required"),
    email: z.email({ invalid_type_error: "Email is required" }).min(1, "Email is required"),
    password: z.string({ invalid_type_error: "Password is required" }).min(1, "Password is required"),
})

