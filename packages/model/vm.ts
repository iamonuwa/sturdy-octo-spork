import { z } from "zod"

export const createVmSchema = z.object({
    name: z.string(),
    cpuCores: z.string(),
    memoryGB: z.preprocess((val: unknown) => typeof val === 'string' ? parseFloat(val) : val, z.number()),
    diskSizeGB: z.preprocess((val: unknown) => typeof val === 'string' ? parseFloat(val) : val, z.number()),
    region: z.string(),
});

export type CreateVm = z.infer<typeof createVmSchema>;


export const updateVmSchema = z.object({
    id: z.number(),
    status: z.string().optional()
});

export type UpdateVm = z.infer<typeof updateVmSchema>;
