import Comment from '@/components/Comment';
import SoundUI from '@/components/Sound';
import { createServerTRPCCaller } from '@/data/trpc/server';
import { Sound } from '@/models/Sound';
import UNREACHABLE_CODE from '@/utils/unreachable-code';
import { notFound } from 'next/navigation';
import NewCommentForm from './components/NewCommentForm';

export default async function SoundPage({
    params
}: {
    params: { id: Sound['id'] };
}) {
    const serverTrpc = await createServerTRPCCaller();

    const sound = await serverTrpc.sounds.getById({ id: params.id });
    if (!sound) notFound();

    const soundMetadata = await serverTrpc.sounds.getMetadata({
        id: params.id
    });
    if (!soundMetadata) UNREACHABLE_CODE();

    const comments = await serverTrpc.sounds.getComments({ id: params.id });

    return (
        <div className='flex h-full w-full flex-row gap-x-36 p-10'>
            <div className='sticky left-0 top-28 flex h-fit flex-1 flex-col items-center'>
                <SoundUI sound={sound} />
                <NewCommentForm sound={sound} />
            </div>
            <div className='flex w-full flex-1 flex-col items-center gap-y-6'>
                <div className='flex w-full max-w-2xl flex-col gap-y-4'>
                    <span className='px-4 text-2xl font-bold'>
                        Comments ({soundMetadata.commentCount})
                    </span>
                    <hr className='rounded-full border-neutral' />
                </div>
                {comments.length === 0 && (
                    <div className='flex flex-col items-center'>
                        <span className='text-2xl font-bold text-neutral'>
                            No comments, yet.
                        </span>
                        <span className='text-neutral'>
                            Be the first one to comment this sound!
                        </span>
                    </div>
                )}
                <div className='flex w-full max-w-2xl flex-col items-center gap-y-4'>
                    {comments.map((comment) => (
                        <Comment
                            className='px-4'
                            key={comment.id}
                            comment={comment}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
