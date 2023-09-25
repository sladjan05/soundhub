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

    response.headers.set('Access-Control-Allow-Credentials', 'true');
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set(
        'Access-Control-Allow-Methods',
        'GET,DELETE,PATCH,POST,PUT'
    );
    response.headers.set(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    return response;
}

export { handler as GET, handler as POST };
