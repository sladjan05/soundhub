import { createTRPCContext } from '@/data/trpc/context';
import { trpcRouter } from '@/data/trpc/routers/main';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';

const handler = (request: Request) => {
    return fetchRequestHandler({
        endpoint: '/api/trpc',
        req: request,
        router: trpcRouter,
        createContext: async (options) => await createTRPCContext()
    });
};

export { handler as GET, handler as POST };
