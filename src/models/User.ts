import { z } from 'zod';

export const schema_user = z.object({
    id: z.string().cuid(),
    name: z.string(),
    email: z.string().email(),
    image: z.string().url().optional().nullable()
});

export type User = z.infer<typeof schema_user>;
