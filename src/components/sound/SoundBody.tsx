import cn from '@/utils/cn';
import { formatArtists, getSquareImage } from '@/utils/spotify';
import { capitalize } from '@/utils/string';
import { ElementProps } from '@/utils/types';
import Image from 'next/image';
import { Sound } from '../../models/Sound';

export default async function SoundBody({
    className,
    sound,

    ...props
}: ElementProps<'div'> & { sound: Sound }) {
    let imageUrl = '';
    let title = '';
    let subtitle = '';

    const { spotifyObject } = sound;

    if (spotifyObject.type === 'artist') {
        imageUrl =
            getSquareImage(spotifyObject.images)?.url || '/spotify-logo.png';
        title = spotifyObject.name;
        subtitle = '';
    }

    if (spotifyObject.type === 'track') {
        imageUrl =
            getSquareImage(spotifyObject.album.images)?.url ||
            '/spotify-logo.png';
        title = spotifyObject.name;
        subtitle = formatArtists(spotifyObject.artists);
    }

    if (spotifyObject.type == 'album') {
        imageUrl =
            getSquareImage(spotifyObject.images)?.url || '/spotify-logo.png';
        title = spotifyObject.name;
        subtitle = formatArtists(spotifyObject.artists);
    }

    return (
        <div className={cn('flex flex-row gap-x-4 p-2', className)} {...props}>
            <a
                className='flex max-w-[13rem] flex-col items-center gap-y-2 transition hover:scale-105'
                href={`https://open.spotify.com/${spotifyObject.type}/${spotifyObject.id}`}
                target='_blank'
            >
                <Image
                    className='h-52 w-52 rounded-md'
                    src={imageUrl}
                    alt=''
                    width={100}
                    height={100}
                />
            </a>
            <div className='flex flex-1 flex-col gap-y-3 px-4 py-2'>
                <div className='flex flex-col p-1 font-bold'>
                    <span className='line-clamp-1 overflow-ellipsis text-xl'>
                        {title}
                    </span>
                    <span className='line-clamp-1 overflow-ellipsis'>
                        <span className='text-neutral'>
                            {capitalize(spotifyObject.type)}
                        </span>
                        {subtitle && ' • '}
                        {subtitle}
                    </span>
                </div>
                <hr className='rounded-full border-neutral' />
                <div className='w-full max-w-full break-words p-1 text-justify'>
                    {sound.content}
                </div>
            </div>
        </div>
    );
}
