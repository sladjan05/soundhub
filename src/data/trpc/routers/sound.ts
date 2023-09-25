import createSound from '@/data/sound/createSound';
import deleteComment from '@/data/sound/deleteComment';
import deleteSound from '@/data/sound/deleteSound';
import getRecommendedSounds from '@/data/sound/getRecommendedSounds';
import getSoundById from '@/data/sound/getSoundById';
import getSoundComments from '@/data/sound/getSoundComments';
import getSoundMetadata from '@/data/sound/getSoundMetadata';
import getUserSounds from '@/data/sound/getUserSounds';
import isSoundLiked from '@/data/sound/isSoundLiked';
import postComment from '@/data/sound/postComment';
import toggleSoundLiked from '@/data/sound/toggleSoundLiked';
import { schema_comment } from '@/models/Comment';
import { schema_sound } from '@/models/Sound';
import { schema_user } from '@/models/User';
import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure
} from '../../trpc';

export const soundRouter = createTRPCRouter({
    getRecommended: publicProcedure.query(
        async () => await getRecommendedSounds()
    ),
    getById: publicProcedure
        .input(schema_sound.pick({ id: true }))
        .query(async ({ input: { id } }) => await getSoundById({ id })),
    create: protectedProcedure
        .input(
            schema_sound.pick({
                content: true,
                spotifyObject: true
            })
        )
        .mutation(
            async ({ input: { content, spotifyObject } }) =>
                await createSound({ content, spotifyObject })
        ),
    delete: protectedProcedure
        .input(schema_sound.pick({ id: true }))
        .mutation(async ({ input: { id } }) => await deleteSound({ id })),
    toggleLiked: protectedProcedure
        .input(schema_sound.pick({ id: true }))
        .mutation(async ({ input: { id } }) => await toggleSoundLiked({ id })),
    isLiked: protectedProcedure
        .input(schema_sound.pick({ id: true }))
        .query(async ({ input: { id } }) => await isSoundLiked({ id })),
    getUserSounds: publicProcedure
        .input(schema_user.pick({ id: true }))
        .query(async ({ input: { id } }) => await getUserSounds({ id })),
    getMetadata: publicProcedure
        .input(schema_sound.pick({ id: true }))
        .query(async ({ input: { id } }) => await getSoundMetadata({ id })),
    getComments: publicProcedure
        .input(schema_sound.pick({ id: true }))
        .query(async ({ input: { id } }) => await getSoundComments({ id })),
    postComment: protectedProcedure
        .input(schema_comment.pick({ soundId: true, content: true }))
        .mutation(
            async ({ input: { soundId, content } }) =>
                await postComment({ soundId, content })
        ),
    deleteComment: protectedProcedure
        .input(schema_comment.pick({ id: true }))
        .mutation(async ({ input: { id } }) => await deleteComment({ id }))
});
