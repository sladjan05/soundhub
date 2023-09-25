import cn from '@/utils/cn';
import { formatArtists, getSquareImage } from '@/utils/spotify';
import { capitalize } from '@/utils/string';
import { ElementProps } from '@/utils/types';
import Image from 'next/image';
import { SpotifyObject } from '../../../models/spotify/SpotifyObject';

export default function SpotifyObject({
    className,
    object,

    ...props
}: ElementProps<'div'> & {
    object: SpotifyObject;
}) {
    let imageUrl = '';
    let title = '';
    let subtitle = '';

    if (object.type === 'artist') {
        imageUrl = getSquareImage(object.images)?.url || '/spotify-logo.png';
        title = object.name;
        subtitle = '';
    }

    if (object.type === 'track') {
        imageUrl =
            getSquareImage(object.album.images)?.url || '/spotify-logo.png';
        title = object.name;
        subtitle = formatArtists(object.artists);
    }

    if (object.type === 'album') {
        imageUrl = getSquareImage(object.images)?.url || '/spotify-logo.png';
        title = object.name;
        subtitle = formatArtists(object.artists);
    }

    return (
        <div
            className={cn(
                'flex w-full max-w-2xl cursor-pointer flex-row items-center justify-between rounded-md bg-base-100 px-3 py-2',
                className
            )}
            role='link'
            {...props}
        >
            <div className='flex flex-row items-center gap-x-4'>
                <Image
                    className='pointer-events-none h-14 w-14 rounded-md'
                    src={imageUrl}
                    alt=''
                    width={100}
                    height={100}
                />
                <div className='pointer-events-none flex flex-col'>
                    <span className='line-clamp-1 overflow-ellipsis font-bold'>
                        {title}
                    </span>
                    <span className='line-clamp-1 overflow-ellipsis text-sm'>
                        <span className='font-medium text-neutral'>
                            {capitalize(object.type)}
                        </span>
                        {subtitle && ' • '}
                        {subtitle}
                    </span>
                </div>
            </div>
        </div>
    );
}
