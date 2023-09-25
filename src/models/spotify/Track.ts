import { z } from 'zod';
import { schema_album } from './Album';
import { schema_artist } from './Artist';

export const schema_track = z.object({
    id: z.string(),
    name: z.string(),
    artists: z.array(schema_artist),
    album: schema_album
});

export type Track = z.infer<typeof schema_track>;
