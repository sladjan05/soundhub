import { z } from 'zod';
import { schema_user } from './User';
import { schema_spotifyObject } from './spotify/SpotifyObject';

export const schema_sound = z.object({
    id: z.string().cuid(),

    author: schema_user,
    content: z.string(),

    spotifyObject: schema_spotifyObject,

    createdAt: z.coerce.date()
});

export const schema_soundMetadata = z.object({
    isLiked: z.boolean(),
    likeCount: z.number().min(0),
    commentCount: z.number().min(0)
});

export type Sound = z.infer<typeof schema_sound>;
export type SoundMetadata = z.infer<typeof schema_soundMetadata>;
