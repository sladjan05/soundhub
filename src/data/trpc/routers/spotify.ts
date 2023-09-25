import getSpotifyObjectById from '@/data/spotify/getSpotifyObjectById';
import searchSpotify from '@/data/spotify/searchSpotify';
import { schema_spotifyObjectType } from '@/models/spotify/SpotifyObject';
import { z } from 'zod';
import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure
} from '../../trpc';

export const spotifyRouter = createTRPCRouter({
    getSpotifyObjectById: publicProcedure
        .input(
            z.object({
                type: schema_spotifyObjectType,
                id: z.string()
            })
        )
        .query(
            async ({ input: { type, id } }) =>
                await getSpotifyObjectById({ type, id })
        ),
    search: protectedProcedure
        .input(
            z.object({
                query: z.string(),
                page: z.number().default(0)
            })
        )
        .query(
            async ({ input: { query, page } }) =>
                await searchSpotify({ query, page })
        )
});
