import {
    SpotifySearchResult,
    schema_spotifySearchResult
} from '@/models/spotify/SpotifyObject';
import { levenshteinDistance } from '@/utils/string';
import { spotify } from '../spotify';

export default async function searchSpotify({
    query,
    page
}: {
    query: string;
    page: number;
}): Promise<SpotifySearchResult> {
    const PER_PAGE = 20;

    const object = await spotify.search(
        query,
        ['artist', 'track', 'album'],
        undefined,
        PER_PAGE,
        PER_PAGE * page
    );

    const searchResult = schema_spotifySearchResult.parse(object);
    searchResult.sort(
        (a, b) =>
            levenshteinDistance(a.name, query) -
            levenshteinDistance(b.name, query)
    );

    return searchResult;
}
