import { z } from 'zod';

export const createUserSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  email: z.email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  role: z.enum(['admin', 'employee'], 'Please enter admin or employee.'),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
