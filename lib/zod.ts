import z from "zod";

export const userSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, "Password must be at least 8 characters"),
    fullName: z.string(),
    designation : z.string(),
    organisation : z.string(),
    branch : z.string(),
    gradYear : z.number().gte(1964),
    mobile: z.string().regex(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits"),
    role : z.enum(["alumni" , "admin"]),
    location: z.string().min(2, "Location is required (City/State)"),
    proofPicture: z.string().optional(),
});

export const signinSchema = z.object({
  email: z.string().email(),
    password: z.string()
    .min(8, { message: 'Minimum length 8' }),
    role : z.enum(["alumni" , "admin"])
})