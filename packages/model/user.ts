import { z } from "zod"

export const createUserSchema = z.object({
    userId: z.string(), // user id
    identifier: z.string(), // email, wallet address, username, etc.
});

export type CreateUser = z.infer<typeof createUserSchema>;
