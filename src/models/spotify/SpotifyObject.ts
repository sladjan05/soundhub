import { z } from 'zod';
import { schema_album } from './Album';
import { schema_artist } from './Artist';
import { schema_track } from './Track';

export const schema_spotifyObjectType = z.union([
    z.literal('artist'),
    z.literal('track'),
    z.literal('album')
]);

export const schema_spotifyObject = z.union([
    schema_artist.merge(z.object({ type: z.literal('artist') })),
    schema_track.merge(z.object({ type: z.literal('track') })),
    schema_album.merge(z.object({ type: z.literal('album') }))
]);

export const dto_spotifySearchResult = z.object({
    artists: z.object({
        items: z.array(schema_artist)
    }),
    tracks: z.object({
        items: z.array(schema_track)
    }),
    albums: z.object({
        items: z.array(schema_album)
    })
});

export const schema_spotifySearchResult = dto_spotifySearchResult
    .transform(({ artists, tracks, albums }) => ({
        artists: artists.items,
        tracks: tracks.items,
        albums: albums.items
    }))
    .transform(({ artists, tracks, albums }) => [
        ...artists.map((artist) => ({
            type: 'artist' as const,
            ...artist
        })),
        ...tracks.map((track) => ({
            type: 'track' as const,
            ...track
        })),
        ...albums.map((albums) => ({
            type: 'album' as const,
            ...albums
        }))
    ]);

export type SpotifyObjectType = z.infer<typeof schema_spotifyObjectType>;
export type SpotifyObject = z.infer<typeof schema_spotifyObject>;

export type SpotifySearchResult = z.infer<typeof schema_spotifySearchResult>;
