import z from "zod";

export const signupSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),

  password: z
    .string()
    .min(6, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),

  email: z.email(),
});

export const otpVarifySchema = z.object({
  email: z.email(),
  otp: z.string().min(4, "Otp should have 4 charecters"),
});

export const optUpdatesSchema = z.object({
  emai: z.email(),
});

export type SignupDto = z.infer<typeof signupSchema>;
export type OtpVarifyDto = z.infer<typeof otpVarifySchema>;
export type OptUpdatesDto = z.infer<typeof optUpdatesSchema> // for resend & remaining time
