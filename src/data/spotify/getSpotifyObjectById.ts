import { schema_album } from '@/models/spotify/Album';
import { schema_artist } from '@/models/spotify/Artist';
import {
    SpotifyObject,
    SpotifyObjectType
} from '@/models/spotify/SpotifyObject';
import { schema_track } from '@/models/spotify/Track';
import UNREACHABLE_CODE from '@/utils/unreachable-code';
import { spotify } from '../spotify';

export default async function getSpotifyObjectById<
    T extends SpotifyObjectType
>({ type, id }: { type: T; id: string }): Promise<SpotifyObject> {
    switch (type) {
        case 'artist': {
            const object = await spotify.artists.get(id);
            const spotifyObject = schema_artist.parse(object);

            return { type: 'artist', ...spotifyObject };
        }

        case 'track': {
            const object = await spotify.tracks.get(id);
            const spotifyObject = schema_track.parse(object);

            return { type: 'track', ...spotifyObject };
        }

        case 'album': {
            const object = await spotify.albums.get(id);
            const spotifyObject = schema_album.parse(object);

            return { type: 'album', ...spotifyObject };
        }
    }

    UNREACHABLE_CODE();
}
