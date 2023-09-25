import SoundUI from '@/components/Sound';
import { Sound } from '@/models/Sound';
import cn from '@/utils/cn';
import { ElementProps } from '@/utils/types';

export default function Sounds({
    className,
    sounds,

    ...props
}: ElementProps<'div'> & {
    sounds: Sound[];
}) {
    return (
        <div
            className={cn('flex w-full max-w-2xl flex-col', className)}
            {...props}
        >
            {sounds.map((sound) => (
                <SoundUI key={sound.id} sound={sound} />
            ))}
        </div>
    );
}
