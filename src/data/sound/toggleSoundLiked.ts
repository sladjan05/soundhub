import { Sound } from '@/models/Sound';
import { prisma } from '../prisma';
import getCurrentUser from '../user/getCurrentUser';
import isSoundLiked from './isSoundLiked';

export default async function toggleSoundLiked({
    id
}: {
    id: Sound['id'];
}): Promise<boolean> {
    const currentUserPromise = getCurrentUser();
    const isLikedPromise = isSoundLiked({ id });

    const currentUser = await getCurrentUser();
    if (!currentUser) return false;

    const isLiked = await isLikedPromise;

    if (isLiked) {
        await prisma.like.delete({
            where: {
                userId_soundId: {
                    userId: currentUser!.id,
                    soundId: id
                }
            }
        });
    } else {
        await prisma.like.create({
            data: {
                userId: currentUser!.id,
                soundId: id
            }
        });
    }

    return !isLiked;
}
