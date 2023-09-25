import { Sound, SoundMetadata } from '@/models/Sound';
import { prisma } from '../prisma';
import isSoundLiked from './isSoundLiked';

export default async function getSoundMetadata({
    id
}: {
    id: Sound['id'];
}): Promise<SoundMetadata | null> {
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

    const isLikedPromise = isSoundLiked({ id });

    const count = await countPromise;
    if (!count) return null;

    const isLiked = await isLikedPromise;
    const likeCount = count._count.likes;
    const commentCount = count._count.comments;

    return {
        isLiked,
        likeCount,
        commentCount
    };
}
