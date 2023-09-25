import { SoundMapper } from '@/mappers/SoundMapper';
import { Sound } from '@/models/Sound';
import { User } from '@/models/User';
import { prisma } from '../prisma';

export default async function getUserSounds({
    id
}: {
    id: User['id'];
}): Promise<Sound[]> {
    const objects = await prisma.sound.findMany({
        where: { authorId: id },
        orderBy: { createdAt: 'desc' }
    });

    const soundPromises = objects.map(
        async (object) => await SoundMapper.mapDatabaseToLocal(object)
    );

    return await Promise.all(soundPromises);
}
