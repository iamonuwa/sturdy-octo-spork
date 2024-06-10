import { z } from "zod"

export const createVmSchema = z.object({
    name: z.string(),
    cpu: z.string(),
    memory: z.preprocess((val: unknown) => typeof val === 'string' ? parseFloat(val) : val, z.number()),
    disk: z.preprocess((val: unknown) => typeof val === 'string' ? parseFloat(val) : val, z.number()),
    region: z.string(),
});

export type CreateVm = z.infer<typeof createVmSchema>;

export const updateVmSchema = z.object({
    id: z.string().optional(),
    status: z.string().optional()
});

export type UpdateVm = z.infer<typeof updateVmSchema>;
