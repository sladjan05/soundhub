import { trpc } from '@/components/TrpcProvider';
import { SpotifyObject } from '@/models/spotify/SpotifyObject';
import cn from '@/utils/cn';
import { ElementProps } from '@/utils/types';
import { useEffect, useState } from 'react';
import SpotifyObjectUI from './SpotifyObject';

export default function SpotifySearchResults({
    className,
    query,

    onPick,

    ...props
}: ElementProps<'div'> & {
    query: string;
    onPick: (result: SpotifyObject) => void;
}) {
    const [page, setPage] = useState(0);
    const [results, setResults] = useState<SpotifyObject[]>([]);
    const [isEndReached, setEndReached] = useState(false);

    const { isFetching: isSearching } = trpc.spotify.search.useQuery(
        {
            query: query || 'nothing else matters',
            page: page
        },
        {
            refetchOnWindowFocus: false,
            onSuccess(data) {
                setEndReached(!data.length);
                console.log(data);
                setResults((current) => [...current, ...data]);
            }
        }
    );

    useEffect(() => {
        setResults([]);
    }, [query]);

    return (
        <div
            className={cn(
                'flex h-full max-h-96 w-full max-w-2xl flex-col items-center gap-y-1 overflow-x-clip overflow-y-scroll overflow-ellipsis',
                className
            )}
            onScroll={(event) => {
                const element = event.currentTarget;
                const scrollTop = element.scrollTop;
                const scrollHeight = element.scrollHeight;
                const clientHeight = element.clientHeight;

                const fractionScrolled =
                    scrollTop / (scrollHeight - clientHeight);

                if (fractionScrolled === 1 && !isSearching && !isEndReached) {
                    setPage((current) => current + 1);
                }
            }}
            {...props}
        >
            {results.map((result) => (
                <SpotifyObjectUI
                    key={result.id}
                    className='transition hover:scale-[101%]'
                    onClick={() => onPick(result)}
                    object={result}
                />
            ))}
            <div
                className={cn(
                    'hidden flex-row items-center justify-center opacity-0 transition',
                    { 'flex opacity-100': results.length === 0 && !isSearching }
                )}
            >
                <span className='text-xl font-bold text-neutral'>
                    No results.
                </span>
            </div>
            <div
                className={cn(
                    'flex scale-0 flex-row items-center justify-center gap-2 opacity-0 transition-all',
                    {
                        'scale-100 opacity-100': isSearching,
                        'hidden': isEndReached
                    }
                )}
            >
                <span className='loading loading-bars loading-lg text-primary' />
            </div>
        </div>
    );
}
