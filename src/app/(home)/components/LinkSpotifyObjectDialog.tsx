'use client';

import SearchBar from '@/components/SearchBar';
import CloseIcon from '@/icons/CloseIcon';
import { SpotifyObject } from '@/models/spotify/SpotifyObject';
import cn from '@/utils/cn';
import { ElementProps } from '@/utils/types';
import { ForwardedRef, forwardRef, useState } from 'react';
import { useDebounce } from 'usehooks-ts';
import SpotifySearchResults from './SpotifySearchResults';

const LinkSpotifyObjectDialog = forwardRef(
    (
        {
            className,

            onPick,
            onClose,

            ...props
        }: ElementProps<'dialog'> & {
            onPick: (result: SpotifyObject) => void;
            onClose: () => void;
        },
        ref: ForwardedRef<HTMLDialogElement>
    ) => {
        const [query, setQuery] = useState('');
        const debouncedQuery = useDebounce(query, 500);

        return (
            <dialog className={cn('modal', className)} ref={ref} {...props}>
                <div className='modal-box relative flex flex-col gap-y-4 border border-neutral p-6'>
                    <div className='flex flex-row items-center justify-between'>
                        <span className='p-2 text-xl font-bold'>
                            Link from Spotify
                        </span>
                        <button
                            className='btn btn-circle btn-ghost btn-sm'
                            onClick={onClose}
                        >
                            <CloseIcon />
                        </button>
                    </div>
                    <SearchBar
                        className='w-full'
                        placeholder='Try "nothing else matters"...'
                        type='outline'
                        onChange={(value) => setQuery(value)}
                    />
                    <form method='dialog'>
                        <SpotifySearchResults
                            query={debouncedQuery}
                            onPick={(result) => {
                                onPick(result);
                                onClose();
                            }}
                        />
                    </form>
                </div>
            </dialog>
        );
    }
);

LinkSpotifyObjectDialog.displayName = 'LinkSpotifyObjectDialog';
export default LinkSpotifyObjectDialog;
