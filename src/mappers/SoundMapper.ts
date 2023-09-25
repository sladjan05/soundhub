import getSpotifyObjectById from '@/data/spotify/getSpotifyObjectById';
import getUserById from '@/data/user/getUserById';
import { Sound as DatabaseSound } from '@prisma/client';
import { Sound, schema_sound } from '../models/Sound';

export class SoundMapper {
    static async mapDatabaseToLocal(data: DatabaseSound): Promise<Sound> {
        const authorPromise = getUserById({ id: data.authorId });

        const spotifyObjectPromise = getSpotifyObjectById({
            type: data.spotifyObjectType,
            id: data.spotifyObjectId
        });

        const author = await authorPromise;
        const spotifyObject = await spotifyObjectPromise;

        const sound = schema_sound.parse({
            author: author,
            spotifyObject: spotifyObject,

            ...data
        });

        return sound;
    }
}
