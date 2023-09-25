import { z } from 'zod';
import { schema_user } from './User';

export const schema_comment = z.object({
    id: z.string().cuid(),

    author: schema_user,
    soundId: z.string().cuid(),

    content: z.string(),

    createdAt: z.coerce.date()
});

export type Comment = z.infer<typeof schema_comment>;
