import { createServerTRPCCaller } from '@/data/trpc/server';
import { Sound } from '@/models/Sound';
import cn from '@/utils/cn';
import { ElementProps } from '@/utils/types';
import SoundActions from './sound/SoundActions';
import SoundBody from './sound/SoundBody';
import SoundHead from './sound/SoundHead';

export default async function Sound({
    className,
    sound,

    ...props
}: ElementProps<'div'> & {
    sound: Sound;
}) {
    const serverTrpc = await createServerTRPCCaller();
    const soundMetadata = await serverTrpc.sounds.getMetadata({ id: sound.id });

    return (
        <div
            className={cn('flex w-full max-w-2xl flex-col p-4', className)}
            key={sound.id} // FIXME: Keys not working in [Sounds] component
            {...props}
        >
            <SoundHead sound={sound} />
            <SoundBody sound={sound} />
            <SoundActions sound={sound} metadata={soundMetadata!} />
        </div>
    );
}
