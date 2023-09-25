import { Comment, schema_comment } from '@/models/Comment';
import { Sound } from '@/models/Sound';
import { z } from 'zod';
import { prisma } from '../prisma';

export default async function getSoundComments({
    id
}: {
    id: Sound['id'];
}): Promise<Comment[]> {
    const objects = await prisma.comment.findMany({
        where: { soundId: id },
        include: { author: true },
        orderBy: { createdAt: 'desc' }
    });

    return z.array(schema_comment).parse(objects);
}
