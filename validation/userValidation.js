import { z } from "zod";

// reusable checks for space problems — used on every text field below
const noLeadingOrTrailingSpace = (value) => value.trim() === value;
const noDoubleSpaces = (value) => !/\s{2,}/.test(value);

export const userSchema = z.object({
  firstName: z
    .string()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters")
    .regex(/^[A-Za-z\s]+$/, "Name should only contain letters")
    .refine(noLeadingOrTrailingSpace, "Name should not start or end with a space")
    .refine(noDoubleSpaces, "Name should not have multiple spaces in a row"),

  lastName: z
    .string()
    .min(1, "Last name is required")
    .min(2, "Last name must be at least 2 characters")
    .regex(/^[A-Za-z\s]+$/, "Last name should only contain letters")
    .refine(noLeadingOrTrailingSpace, "Last name should not start or end with a space")
    .refine(noDoubleSpaces, "Last name should not have multiple spaces in a row"),

  email: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email address")
    .refine(noLeadingOrTrailingSpace, "Email should not have leading or trailing spaces"),

  contact: z
    .string()
    .min(1, "Contact number is required")
    .refine(
      (val) => /^[+]?[0-9\s-]+$/.test(val),
      "Contact number can only contain digits, spaces, hyphens, and a leading +"
    )
    .refine((val) => {
      // strip out the formatting characters and check there are enough
      // ACTUAL digits — this is what stops something like "-------"
      // (only hyphens, no digits) from passing
      const digitsOnly = val.replace(/[+\s-]/g, "");
      return /^\d{7,15}$/.test(digitsOnly);
    }, "Enter a valid contact number (7 to 15 digits)")
    .refine(noDoubleSpaces, "Contact should not have multiple spaces in a row"),

  address: z
    .string()
    .min(1, "Address is required")
    .min(5, "Address must be at least 5 characters")
    .refine(noLeadingOrTrailingSpace, "Address should not start or end with a space")
    .refine(noDoubleSpaces, "Address should not have multiple spaces in a row"),

  age: z.coerce
    .number({ invalid_type_error: "Age is required and must be a number" })
    .int("Age must be a whole number")
    .min(1, "Age must be greater than 0")
    .max(120, "Enter a valid age"),

  gender: z.string().min(1, "Please select a gender"),
});
