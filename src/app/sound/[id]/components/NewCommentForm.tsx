'use client';

import { useToast } from '@/components/ToastProvider';
import { trpc } from '@/components/TrpcProvider';
import { Sound } from '@/models/Sound';
import cn from '@/utils/cn';
import { ElementProps } from '@/utils/types';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';

export default function NewCommentForm({
    className,
    sound,

    ...props
}: ElementProps<'div'> & {
    sound: Sound;
}) {
    const router = useRouter();
    const { showToast } = useToast();

    const contentDiv = useRef<HTMLDivElement>(null);
    const [content, setContent] = useState('');

    const { isLoading: isPosting, mutate: postComment } =
        trpc.sounds.postComment.useMutation({
            onSuccess() {
                contentDiv.current!.innerText = '';
                setContent('');

                showToast('Comment has been posted.');
                router.refresh();
            }
        });

    return (
        <div
            className={cn(
                'relative flex w-full max-w-2xl flex-col gap-y-2 rounded-lg border border-neutral px-2 pb-4 pt-2',
                className
            )}
            {...props}
        >
            <div className='relative w-full'>
                <div
                    className='peer textarea textarea-ghost relative w-full text-justify text-lg !outline-none'
                    ref={contentDiv}
                    role='textbox'
                    contentEditable={!isPosting}
                    onInput={(event) =>
                        setContent(event.currentTarget.textContent || '')
                    }
                />
                <span className='pointer-events-none absolute left-4 top-2 hidden text-lg peer-empty:block'>
                    Share your thoughts...
                </span>
            </div>
            <div className='absolute bottom-0 right-5 translate-y-1/2 rounded-full bg-base-100 px-3 py-2'>
                <button
                    className='peer btn btn-ghost rounded-full border border-secondary text-secondary hover:btn-secondary'
                    disabled={isPosting || !content}
                    onClick={() => {
                        postComment({
                            soundId: sound.id,
                            content: content
                        });
                    }}
                >
                    Post comment
                </button>
            </div>
            <div
                className='tooltip tooltip-top absolute right-4 top-4 z-50'
                data-tip='Posting on soundhub...'
            >
                <span
                    className={cn(
                        'loading loading-bars scale-0 text-primary opacity-0 transition-all',
                        { 'scale-100 opacity-100': isPosting }
                    )}
                />
            </div>
        </div>
    );
}
