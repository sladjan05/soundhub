import { createTRPCRouter } from '../../trpc';
import { soundRouter } from './sound';
import { spotifyRouter } from './spotify';
import { userRouter } from './user';

export const trpcRouter = createTRPCRouter({
    user: userRouter,
    sounds: soundRouter,
    spotify: spotifyRouter
});

export type TrpcRouter = typeof trpcRouter;
