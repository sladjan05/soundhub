import { prisma } from '@/data/prisma';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth/next';
import SpotifyProvider from 'next-auth/providers/spotify';
import { schema_user } from '../../../../models/User';

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    secret: process.env.AUTH_SECRET,
    session: { strategy: 'jwt' },
    providers: [
        SpotifyProvider({
            clientId: process.env.SPOTIFY_CLIENT_ID!,
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET!
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) token.user = schema_user.parse(user);
            return Promise.resolve(token);
        },
        async session({ session, token }) {
            session.user = token.user!;
            return Promise.resolve(session);
        }
    }
} as NextAuthOptions;

const authHandler = NextAuth(authOptions);
export { authHandler as GET, authHandler as POST };
