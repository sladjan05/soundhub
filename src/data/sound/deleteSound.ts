import { SoundMapper } from '@/mappers/SoundMapper';
import { Sound } from '@/models/Sound';
import { prisma } from '../prisma';

export default async function deleteSound({
    id
}: {
    id: Sound['id'];
}): Promise<Sound | null> {
    const object = await prisma.sound.delete({ where: { id } });
    if (!object) return null;

    return await SoundMapper.mapDatabaseToLocal(object);
}
