import { Sound, SoundMetadata } from '@/models/Sound';
import { prisma } from '../prisma';
import getCurrentUserId from '../user/getCurrentUserId';

export default async function getSoundMetadata({
    id
}: {
    id: Sound['id'];
}): Promise<SoundMetadata | null> {
    const userIdPromise = getCurrentUserId();
    const countPromise = prisma.sound.findUnique({
        where: { id },
        include: {
            _count: {
                select: {
                    likes: true,
                    comments: true
                }
            }
        }
    });

    const userId = await userIdPromise;

    const count = await countPromise;
    if (!count) return null;

    const likeCount = count._count.likes;
    const commentCount = count._count.comments;

    const isLiked = userId
        ? !!(await prisma.like.count({
              where: { userId: userId, soundId: id }
          }))
        : false;

    return {
        isLiked,
        likeCount,
        commentCount
    };
}
