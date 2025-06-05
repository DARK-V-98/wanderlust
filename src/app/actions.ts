
"use server";
import { z } from "zod";

const inquirySchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  subject: z.string().min(2, { message: "Subject must be at least 2 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

export type InquiryFormState = {
  message: string;
  errors?: {
    name?: string[];
    email?: string[];
    subject?: string[];
    message?: string[];
  };
  data?: z.infer<typeof inquirySchema>;
  success?: boolean;
};

export async function submitInquiry(prevState: InquiryFormState, formData: FormData): Promise<InquiryFormState> {
  const rawData = Object.fromEntries(formData.entries());
  const validatedFields = inquirySchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      message: "Validation failed. Please check your input.",
      errors: validatedFields.error.flatten().fieldErrors,
      success: false,
    };
  }

  // In a real app, you would send an email, save to DB, etc.
  console.log("Inquiry submitted:", validatedFields.data);
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  return {
    message: "Thank you for your inquiry! We will get back to you soon.",
    data: validatedFields.data,
    success: true,
  };
}

    