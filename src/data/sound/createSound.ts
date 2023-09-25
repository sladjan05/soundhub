import { Sound } from '@/models/Sound';
import { prisma } from '../prisma';
import getCurrentUserId from '../user/getCurrentUserId';

export default async function createSound({
    content,
    spotifyObject
}: Pick<Sound, 'content' | 'spotifyObject'>): Promise<string> {
    const userId = await getCurrentUserId();
    const object = await prisma.sound.create({
        data: {
            authorId: userId!,

            content: content,

            spotifyObjectType: spotifyObject.type,
            spotifyObjectId: spotifyObject.id
        }
    });

    return object.id;
}
