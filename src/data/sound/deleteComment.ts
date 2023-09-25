import { Comment, schema_comment } from '@/models/Comment';
import { prisma } from '../prisma';

export default async function deleteComment({
    id
}: {
    id: Comment['id'];
}): Promise<Comment | null> {
    const object = await prisma.comment.delete({
        where: { id },
        include: { author: true }
    });

    if (!object) return null;

    return schema_comment.parse(object);
}
