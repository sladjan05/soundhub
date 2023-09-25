import { z } from 'zod';
import { schema_image } from './Image';

export const schema_artist = z.object({
    id: z.string(),
    name: z.string(),
    images: z.array(schema_image).optional()
});

export type Artist = z.infer<typeof schema_artist>;
