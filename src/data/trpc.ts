import { initTRPC } from '@trpc/server';
import SuperJSON from 'superjson';
import { createTRPCContext } from './trpc/context';

export const t = initTRPC.context<typeof createTRPCContext>().create({
    transformer: SuperJSON,
    allowOutsideOfServer: true
});

const isAuthenticated = t.middleware(({ next, ctx }) => {
    return next({ ctx: { session: ctx.session } });
});

export const createTRPCRouter = t.router;

export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuthenticated);
