'use client';

import { useToast } from '@/components/ToastProvider';
import { trpc } from '@/components/TrpcProvider';
import NoteIcon from '@/icons/NoteIcon';
import { SpotifyObject } from '@/models/spotify/SpotifyObject';
import cn from '@/utils/cn';
import { ElementProps } from '@/utils/types';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import LinkSpotifyObjectDialog from './LinkSpotifyObjectDialog';
import LinkedSpotifyObject from './LinkedSpotifyObject';

export default function NewSoundForm({
    className,
    ...props
}: ElementProps<'div'>) {
    const router = useRouter();
    const { showToast } = useToast();

    const contentDiv = useRef<HTMLDivElement>(null);
    const [content, setContent] = useState('');

    const linkDialog = useRef<HTMLDialogElement>(null);
    const [linkedSpotifyObject, setLinkedSpotifyObject] =
        useState<SpotifyObject>();

    const { isLoading: isPosting, mutate: createSound } =
        trpc.sounds.create.useMutation({
            onSuccess() {
                contentDiv.current!.innerText = '';
                setContent('');
                setLinkedSpotifyObject(undefined);

                showToast('Sound has been posted.');
                router.refresh();
            }
        });

    return (
        <>
            <div
                className={cn(
                    'relative flex w-full max-w-2xl flex-col gap-y-2 rounded-lg border border-neutral p-4',
                    { 'gap-y-10': linkedSpotifyObject }
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
                <div className='flex w-full flex-row'>
                    {linkedSpotifyObject && (
                        <LinkedSpotifyObject
                            object={linkedSpotifyObject}
                            unlinkDisabled={isPosting}
                            onUnlink={() => setLinkedSpotifyObject(undefined)}
                        />
                    )}
                    {!linkedSpotifyObject && (
                        <div
                            className='tooltip tooltip-top'
                            data-tip='Link from Spotify'
                        >
                            <button
                                className='btn hover:scale-105'
                                onClick={() => linkDialog.current?.showModal()}
                            >
                                <NoteIcon />
                            </button>
                        </div>
                    )}
                </div>
                <div className='absolute bottom-0 right-5 translate-y-1/2 rounded-full bg-base-100 px-3 py-2'>
                    <button
                        className='peer btn btn-ghost rounded-full border border-secondary text-secondary hover:btn-secondary'
                        disabled={isPosting || !linkedSpotifyObject || !content}
                        onClick={() => {
                            createSound({
                                content: content,
                                spotifyObject: linkedSpotifyObject!
                            });
                        }}
                    >
                        Sound!
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
            <LinkSpotifyObjectDialog
                ref={linkDialog}
                onPick={(result) => setLinkedSpotifyObject(result)}
                onClose={() => linkDialog.current?.close()}
            />
        </>
    );
}
