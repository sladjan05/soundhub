'use client';

import CommentIcon from '@/icons/CommentIcon';
import HeartIcon from '@/icons/HeartIcon';
import SaveIcon from '@/icons/SaveIcon';
import ShareIcon from '@/icons/ShareIcon';
import cn from '@/utils/cn';
import { ElementProps } from '@/utils/types';
import { useState } from 'react';
import { Sound, SoundMetadata } from '../../models/Sound';
import { trpc } from '../TrpcProvider';

export default function SoundActions({
    className,

    sound,
    metadata,

    ...props
}: ElementProps<'div'> & {
    sound: Sound;
    metadata: SoundMetadata;
}) {
    const [isLiked, setLiked] = useState(metadata.isLiked);
    const [likeCount, setLikeCount] = useState(metadata.likeCount);

    const { isLoading: isLiking, mutate: toggleSoundLiked } =
        trpc.sounds.toggleLiked.useMutation({
            onSuccess() {
                setLiked((currentIsLiked) => {
                    const newIsLiked = !currentIsLiked;

                    setLikeCount((currentLikeCount) => {
                        const change = newIsLiked ? 1 : -1;
                        return currentLikeCount + change;
                    });

                    return newIsLiked;
                });
            }
        });

    return (
        <div
            className={cn('flex flex-row justify-between p-2', className)}
            {...props}
        >
            <div className='flex flex-row items-center gap-x-4'>
                <span className='flex flex-col items-center -space-y-1'>
                    <button
                        className='btn p-0 hover:scale-105 disabled:bg-transparent'
                        disabled={isLiking}
                        onClick={() => toggleSoundLiked({ id: sound.id })}
                    >
                        <HeartIcon
                            className={cn({ 'fill-current': isLiked })}
                        />
                    </button>
                    <span className='z-[1] select-none text-xs font-bold'>
                        {likeCount}
                    </span>
                </span>
                <span className='flex flex-col items-center -space-y-1'>
                    <a
                        className='btn p-0 hover:scale-105'
                        href={`/sound/${sound.id}`}
                    >
                        <CommentIcon />
                    </a>
                    <span className='z-[1] select-none text-xs font-bold'>
                        {metadata.commentCount}
                    </span>
                </span>
                <span className='flex flex-col items-center -space-y-1'>
                    <button className='btn p-0 hover:scale-105'>
                        <ShareIcon />
                    </button>
                    <span className='z-[1] select-none text-xs font-bold'>
                        897
                    </span>
                </span>
            </div>
            <button className='btn p-0 hover:scale-105'>
                <SaveIcon />
            </button>
        </div>
    );
}
