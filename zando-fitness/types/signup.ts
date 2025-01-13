import { z } from 'zod'

export const registrationSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters" }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" })
      .min(5, { message: "Email must be at least 5 characters long" })
      .max(50, { message: "Email must not exceed 50 characters" }),

  phone: z.string()
    .regex(/^\+?[1-9]\d{1,14}$/, { message: "Invalid phone number" }),
  address: z.string().min(5, { message: "Address must be at least 5 characters" }),
  dateOfBirth: z.string().refine((date) => {
    const birthDate = new Date(date)
    const today = new Date()
    const minAge = 16
    const maxAge = 100
    const age = today.getFullYear() - birthDate.getFullYear()
    return age >= minAge && age <= maxAge
  }, { message: "You must be between 16 and 100 years old" }),
  membershipId: z.string().min(1, { message: "Please select a membership type" }),
  emergencyContact: z.string().min(5, { message: "Emergency contact must be at least 5 characters" }),
  image: z.string().optional(),
  password: z.string()
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
      .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
      .regex(/\d/, { message: "Password must contain at least one number" })
      .regex(/[@$!%*?&#^]/, { message: "Password must contain at least one special character (@, $, !, %, *, ?, &, #, ^)" })
      .max(20, { message: "Password must be less than 20 characters" }),
});

export type RegistrationSchema = z.infer<typeof registrationSchema>;
