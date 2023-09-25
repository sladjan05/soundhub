import Sounds from '@/components/Sounds';
import { createServerTRPCCaller } from '@/data/trpc/server';
import NewSoundForm from './components/NewSoundForm';

export default async function HomePage() {
    const serverTrpc = await createServerTRPCCaller();

    const user = await serverTrpc.user.getCurrent();
    const sounds = await serverTrpc.sounds.getRecommended();

    return (
        <div className='flex w-full flex-col items-center'>
            {user && <NewSoundForm />}
            <Sounds sounds={sounds} />
        </div>
    );
}
