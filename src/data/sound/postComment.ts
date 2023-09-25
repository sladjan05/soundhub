import { Comment } from '@/models/Comment';
import { prisma } from '../prisma';
import getCurrentUserId from '../user/getCurrentUserId';

export default async function postComment({
    soundId,
    content
}: Pick<Comment, 'soundId' | 'content'>): Promise<string> {
    const userId = await getCurrentUserId();
    console.log(userId);
    if (!userId) return '';

    const object = await prisma.comment.create({
        data: {
            authorId: userId,
            soundId: soundId,
            content: content
        }
    });

    return object.id;
}
