import { SoundMapper } from '@/mappers/SoundMapper';
import { Sound } from '@/models/Sound';
import { prisma } from '../prisma';

export default async function getRecommendedSounds(): Promise<Sound[]> {
    // TODO: Implement a real recommendation algorithm

    const objects = await prisma.sound.findMany({
        orderBy: { createdAt: 'desc' }
    });

    const soundPromises = objects.map(async (object) => {
        return await SoundMapper.mapDatabaseToLocal(object);
    });

    return await Promise.all(soundPromises);
}
