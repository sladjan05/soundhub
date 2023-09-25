import { Sound } from '@/models/Sound';
import { prisma } from '../prisma';
import getCurrentUserId from '../user/getCurrentUserId';

export default async function isSoundLiked({
    id
}: {
    id: Sound['id'];
}): Promise<boolean> {
    const userId = await getCurrentUserId();

    if (!userId) return false;

    const object = await prisma.like.findFirst({
        where: {
            userId: userId,
            soundId: id
        }
    });

    return !!object;
}
