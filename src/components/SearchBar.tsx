'use client';

import SearchIcon from '@/icons/SearchIcon';
import cn from '@/utils/cn';
import { ElementProps } from '@/utils/types';
import { VariantProps, cva } from 'class-variance-authority';

const variants = cva('', {
    variants: {
        type: {
            ghost: 'input-ghost',
            outline: 'input-outline'
        }
    },
    defaultVariants: {
        type: 'ghost'
    }
});

export default function SearchBar({
    className,
    placeholder,

    type,

    onChange,

    ...props
}: Omit<ElementProps<'div'>, 'onChange'> &
    VariantProps<typeof variants> & {
        placeholder: string;
        onChange: (value: string) => void;
    }) {
    return (
        <div className={cn('relative', className)} {...props}>
            <input
                className={cn(
                    'peer input w-full px-16 text-center',
                    variants({ type })
                )}
                type='text'
                placeholder={placeholder}
                onChange={(event) => onChange(event.currentTarget.value)}
            />
            <SearchIcon className='absolute left-5 top-1/2 h-7 w-7 -translate-y-1/2 opacity-0 transition peer-focus:opacity-100' />
        </div>
    );
}
