import { Artist } from '../models/spotify/Artist';
import { Image } from '../models/spotify/Image';

export function getSquareImage(images?: Image[]) {
    if (!images) return null;
    if (images.length === 0) return null;

    return images.find((image) => image.width === image.height);
}

export function formatArtists(artists: Artist[]) {
    const names = artists.map((artist) => artist.name);

    const count = names.length;
    const first = names[0];
    if (count === 1) return first;

    const firstTwo = names.splice(0, 2).join(' & ');
    if (count == 2) return firstTwo;

    return `${first} and ${count - 1} others`;
}
