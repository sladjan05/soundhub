'use client';

import { TrpcRouter } from '@/data/trpc/routers/main';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { getFetch, httpBatchLink, loggerLink } from '@trpc/client';
import { createTRPCReact } from '@trpc/react-query';
import { ReactNode, useState } from 'react';
import superjson from 'superjson';

export const trpc = createTRPCReact<TrpcRouter>();

export default function TrpcProvider({ children }: { children: ReactNode }) {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: { queries: { staleTime: 5000 } }
            })
    );

    const url = process.env.NEXT_PUBLIC_VERCEL_URL
        ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/trpc`
        : 'http://localhost:3000/api/trpc/';

    const [trpcClient] = useState(() =>
        trpc.createClient({
            links: [
                loggerLink({
                    enabled: () => true
                }),
                httpBatchLink({
                    url,
                    fetch: async (input, init?) => {
                        const fetch = getFetch();
                        return fetch(input, {
                            ...init,
                            credentials: 'include'
                        });
                    },
                    async headers() {
                        return {
                            'Access-Control-Allow-Credentials': 'true',
                            'Access-Control-Allow-Origin':
                                'https://soundhub-three.vercel.app',
                            'Access-Control-Allow-Methods':
                                'GET,OPTIONS,PATCH,DELETE,POST,PUT',
                            'Access-Control-Allow-Headers':
                                'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
                        };
                    }
                })
            ],
            transformer: superjson
        })
    );

    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                {children}
                <ReactQueryDevtools />
            </QueryClientProvider>
        </trpc.Provider>
    );
}
