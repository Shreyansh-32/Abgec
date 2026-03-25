import z from "zod";

const optionalString = z
  .union([z.string().trim(), z.literal("")])
  .optional()
  .transform((value) => (value === "" ? undefined : value));

const optionalUrl = z
  .union([z.string().trim().url("Enter a valid URL"), z.literal("")])
  .optional()
  .transform((value) => (value === "" ? undefined : value));

export const mentorFormSchema = z.object({
  isPaid: z.boolean(),
  domain: z.string().trim().min(2, "Domain is required"),
});

export const achievementFormSchema = z.object({
  achievement: z.string().trim().min(3, "Achievement is required"),
  attachmentUrl: z.string().optional(),
});

export const opportunityFormSchema = z.object({
  jobTitle: z.string().trim().min(2, "Job title is required"),
  location: optionalString,
  remotePosition: z.boolean(),
  jobType: z.enum(["FullTime", "PartTime", "Internship", "Temporary"]),
  description: z.string().trim().min(10, "Description is too short"),
  applicationUrl: optionalUrl,
  companyName: z.string().trim().min(2, "Company name is required"),
  website: optionalUrl,
  attachmentUrl: z.string().optional(),
});

export type MentorFormValues = z.infer<typeof mentorFormSchema>;
export type AchievementFormValues = z.infer<typeof achievementFormSchema>;
export type OpportunityFormInput = z.input<typeof opportunityFormSchema>;
export type OpportunityFormValues = z.output<typeof opportunityFormSchema>;
