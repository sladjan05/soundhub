import getAuthSession from '../auth/getAuthSession';

export default async function getCurrentUserId(): Promise<string | null> {
    const session = await getAuthSession();
    if (!session) return null;

    return session.user.id;
}
