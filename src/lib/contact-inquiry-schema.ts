import { z } from "zod";

export const contactInquiryBodySchema = z.object({
  name: z.string().trim().min(2, "Please enter your name (at least 2 characters).").max(120),
  email: z.string().trim().email("Please enter a valid email address.").max(254),
  company: z.string().max(200).optional().or(z.literal("")),
  phone: z.string().max(40).optional().or(z.literal("")),
  industry: z.string().max(120).optional().or(z.literal("")),
  service: z.string().max(120).optional().or(z.literal("")),
  companySize: z.string().max(40).optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, "Please enter at least 10 characters in your message.")
    .max(5000),
});

export function firstContactValidationError(
  error: z.ZodError<z.infer<typeof contactInquiryBodySchema>>,
): string {
  const issue = error.issues[0];
  return issue?.message ?? "Please check the form and try again.";
}
