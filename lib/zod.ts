import z from "zod";

export const userSchema = z.object({
    email: z.string().email(),
    password: z.string()
    .min(8, { message: 'Minimum length 8' })
    .max(20, { message: 'Maximum length 20' })
    .refine((password) => /[A-Z]/.test(password), {
      message: 'Must contain one uppercase alphabet',
    })
    .refine((password) => /[a-z]/.test(password), {
      message: 'Must contain one lowercase alphabet',
    })
    .refine((password) => /[0-9]/.test(password), { message: 'Must contain one digit' })
    .refine((password) => /[!@#$%^&*]/.test(password), {
      message: 'Must contain one specail character',
    }),
    fullName: z.string(),
    designation : z.string(),
    organisation : z.string(),
    branch : z.string(),
    gradYear : z.number().gte(1964),
    mobile : z.number().gte(1000000000).lte(9999999999),
    role : z.enum(["alumni" , "admin"])
});

export const signinSchema = z.object({
  email: z.string().email(),
    password: z.string()
    .min(8, { message: 'Minimum length 8' })
    .max(20, { message: 'Maximum length 20' })
    .refine((password) => /[A-Z]/.test(password), {
      message: 'Must contain one uppercase alphabet',
    })
    .refine((password) => /[a-z]/.test(password), {
      message: 'Must contain one lowercase alphabet',
    })
    .refine((password) => /[0-9]/.test(password), { message: 'Must contain one digit' })
    .refine((password) => /[!@#$%^&*]/.test(password), {
      message: 'Must contain one specail character',
    }),
    role : z.enum(["alumni" , "admin"])
})