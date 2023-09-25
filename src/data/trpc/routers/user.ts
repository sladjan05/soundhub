import getCurrentUser from '@/data/user/getCurrentUser';
import getUserById from '@/data/user/getUserById';
import { schema_user } from '@/models/User';
import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure
} from '../../trpc';

export const userRouter = createTRPCRouter({
    getCurrent: protectedProcedure.query(async () => {
        const user = await getCurrentUser();
        return user;
    }),
    getById: publicProcedure
        .input(schema_user.pick({ id: true }))
        .query(async ({ input: { id } }) => await getUserById({ id }))
});
