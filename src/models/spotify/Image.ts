import { z } from 'zod';

export const schema_image = z.object({
    url: z.string().url(),
    width: z.number(),
    height: z.number()
});

export type Image = z.infer<typeof schema_image>;
