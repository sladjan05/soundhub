import Sounds from '@/components/Sounds';
import { createServerTRPCCaller } from '@/data/trpc/server';
import { User } from '@/models/User';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export default async function UserPage({
    params
}: {
    params: { id: User['id'] };
}) {
    const serverTrpc = await createServerTRPCCaller();

    const user = await serverTrpc.user.getById({ id: params.id });
    if (!user) notFound();

    const sounds = await serverTrpc.sounds.getUserSounds({ id: user.id });

    return (
        <div className='flex flex-row'>
            <div className='sticky left-0 top-28 flex h-fit w-full max-w-xl flex-col items-center gap-y-4 px-28 py-10'>
                <div className='avatar'>
                    <div className='mask mask-squircle w-52'>
                        <Image
                            src={
                                user!.image ||
                                `https://api.dicebear.com/7.x/initials/svg?seed=${
                                    user!.name
                                }`
                            }
                            alt=''
                            width={100}
                            height={100}
                        />
                    </div>
                </div>
                <div className='flex flex-col items-center'>
                    <span className='text-2xl'>{user!.name}</span>
                    <span className='text-base text-neutral'>
                        {user!.email}
                    </span>
                </div>
            </div>
            <div className='flex w-full flex-col items-center'>
                <Sounds sounds={sounds} />
            </div>
            <div className='flex w-full max-w-xl'></div>
        </div>
    );
}
