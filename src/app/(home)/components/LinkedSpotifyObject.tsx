'use client';

import CloseIcon from '@/icons/CloseIcon';
import cn from '@/utils/cn';
import { ElementProps } from '@/utils/types';
import { type SpotifyObject } from '../../../models/spotify/SpotifyObject';
import SpotifyObjectUI from './SpotifyObject';

export default function LinkedSpotifyObject({
    className,
    object,

    unlinkDisabled,
    onUnlink,

    ...props
}: ElementProps<'div'> & {
    object: SpotifyObject;
    unlinkDisabled: boolean;
    onUnlink: () => void;
}) {
    return (
        <div
            className={cn(
                'relative max-w-xs rounded-md border border-neutral',
                className
            )}
            {...props}
        >
            <a
                href={`https://open.spotify.com/${object.type}/${object.id}`}
                target='_blank'
            >
                <SpotifyObjectUI className='w-fit' object={object} />
            </a>
            <div
                className={cn(
                    'absolute -top-3.5 right-2 bg-base-100 transition',
                    { 'opacity-0': unlinkDisabled }
                )}
            >
                <button
                    className='btn btn-circle btn-ghost btn-xs'
                    disabled={unlinkDisabled}
                    onClick={onUnlink}
                >
                    <CloseIcon />
                </button>
            </div>
        </div>
    );
}
