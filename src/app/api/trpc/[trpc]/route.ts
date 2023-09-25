import { createTRPCContext } from '@/data/trpc/context';
import { trpcRouter } from '@/data/trpc/routers/main';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';

async function handler(request: Request) {
    const response = await fetchRequestHandler({
        endpoint: '/api/trpc',
        req: request,
        router: trpcRouter,
        createContext: async (options) => await createTRPCContext()
    });

    return response;
}

export { handler as GET, handler as POST };
