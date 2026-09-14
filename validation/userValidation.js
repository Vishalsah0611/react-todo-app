import { z } from "zod";
export const userSchema = z.object({
  firstName: z
    .string()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters")
    .regex(/^[A-Za-z\s]+$/, "Name should only contain letters"),

  lastName: z
    .string()
    .min(1, "Last name is required")
    .min(2, "Last name must be at least 2 characters")
    .regex(/^[A-Za-z\s]+$/, "Last name should only contain letters"),

  email: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email address"),

  contact: z
    .string()
    .min(1, "Contact number is required")
    .regex(/^[+]?[0-9\s-]{7,15}$/, "Enter a valid contact number"),

  address: z
    .string()
    .min(1, "Address is required")
    .min(5, "Address must be at least 5 characters"),

  gender: z
    .string()
    .min(1, "Please select a gender"),
});