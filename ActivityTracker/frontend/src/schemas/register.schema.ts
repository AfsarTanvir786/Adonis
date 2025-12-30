import { z } from 'zod'

export const registerSchema = z.object({
  ownerName: z
    .string()
    .min(2, 'Name must be at least 2 characters'),

  ownerEmail: z
    .string()
    .email('Invalid email address'),

  companyName: z
    .string()
    .min(2, 'Company name is required'),

  password: z
    .string()
    .min(8, 'Password must be at least 8 characters'),

  planSectionId: z
    .number()
    .int()
    .positive('Please select a plan'),
})

export type RegisterFormData = z.infer<typeof registerSchema>
