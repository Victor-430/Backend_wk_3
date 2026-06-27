import z from "zod"

export const loginSchema = z.object({
    email: z.email({ invalid_type_error: "Email is required" }).min(1, "Email is required"),
    password: z.string({ invalid_type_error: "Password is required" }).min(1, "Password is required"),
})

// export const registerSchema = z.object({
//     username: z.string({ invalid_type_error: "username is required" }).min(1, "Username is required"),
//     email: z.email({ invalid_type_error: "Email is required" }).min(1, "Email is required"),
//     password: z.string({ invalid_type_error: "Password is required" }).min(1, "Password is required"),
// })


export const registerSchema = z.object({
  username: z
    .string({
      required_error: "Username is required",        // Triggers if field is missing/undefined
      invalid_type_error: "Username must be text",    // Triggers if field is a number/boolean
    })
    .min(1, "Username is required"),                 // Triggers if field is an empty string ""

    email: z
    .email({
      required_error: "email is required",        
      invalid_type_error: "Invalid email format",   
    })
    .min(1, "Email is required"), 

    password: z
    .string({
      required_error: "Password is required",        
      invalid_type_error: "Password should be a text",   
    })
    .min(6, "Password should contain at least characters"), 
});
