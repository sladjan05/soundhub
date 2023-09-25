import { createTRPCContext } from '@/data/trpc/context';
import { trpcRouter } from '@/data/trpc/routers/main';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';

async function handler(request: Request) {
    return fetchRequestHandler({
        endpoint: '/api/trpc',
        req: request,
        router: trpcRouter,
        createContext: async (options) => await createTRPCContext()
    });
}

async function m(request: Request) {
    const response = await handler(request);

    response.headers.append('Access-Control-Allow-Origin', '*');
    response.headers.append('Access-Control-Request-Method', '*');
    response.headers.append('Access-Control-Allow-Methods', 'OPTIONS, GET');
    response.headers.append('Access-Control-Allow-Headers', '*');

    return response;
}

export { handler as GET, handler as POST };
