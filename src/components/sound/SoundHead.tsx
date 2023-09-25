import { Sound } from '@/models/Sound';
import cn from '@/utils/cn';
import { timeAgo } from '@/utils/date';
import { ElementProps } from '@/utils/types';
import Image from 'next/image';
import SoundMenu from './SoundMenu';

export default async function SoundHead({
    className,
    sound,

    ...props
}: ElementProps<'div'> & { sound: Sound }) {
    return (
        <div
            className={cn(
                'flex h-20 flex-row items-center justify-between p-2',
                className
            )}
            {...props}
        >
            <a
                className='flex flex-row items-center gap-x-4'
                href={`/user/${sound.author.id}`}
            >
                <div className='avatar'>
                    <div className='mask mask-squircle w-12'>
                        <Image
                            src={
                                sound.author.image ||
                                `https://api.dicebear.com/7.x/initials/svg?seed=${sound.author.name}`
                            }
                            alt=''
                            width={100}
                            height={100}
                        />
                    </div>
                </div>
                <div className='flex flex-col'>
                    <span className='font-bold'>{sound.author.name}</span>
                    <span className='text-sm '>{timeAgo(sound.createdAt)}</span>
                </div>
            </a>
            <SoundMenu sound={sound} />
        </div>
    );
}
