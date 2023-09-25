import { User } from '@/models/User';
import getCurrentUserId from './getCurrentUserId';
import getUserById from './getUserById';

export default async function getCurrentUser(): Promise<User | null> {
    const userId = await getCurrentUserId();
    if (!userId) return null;

    return await getUserById({ id: userId });
}
