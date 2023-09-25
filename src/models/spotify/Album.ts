import { z } from 'zod';
import { schema_artist } from './Artist';
import { schema_image } from './Image';

export const schema_album = z.object({
    id: z.string(),
    name: z.string(),
    artists: z.array(schema_artist),
    images: z.array(schema_image)
});

export type Album = z.infer<typeof schema_album>;
