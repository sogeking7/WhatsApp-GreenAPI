import { z } from "zod";

export const SignInFormSchema = z.object({
  idInstance: z
    .string()
    .min(2, { message: "Id Instance must be at least 2 characters long." })
    .trim(),
  apiTokenInstance: z
    .string()
    .min(2, {
      message: "Api Token Instance must be at least 2 characters long.",
    })
    .trim(),
});

export type SignInForm = z.infer<typeof SignInFormSchema>;
