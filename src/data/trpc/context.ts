import getAuthSession from '../auth/getAuthSession';

export async function createTRPCContext() {
    const session = await getAuthSession();
    return { session };
}
