'use client';

import cn from '@/utils/cn';
import { ElementProps } from '@/utils/types';
import { signIn } from 'next-auth/react';
import Image from 'next/image';

export default function SignInButton({
    className,
    ...props
}: ElementProps<'button'>) {
    return (
        <button
            className={cn('btn btn-ghost h-16 gap-x-5 rounded-full', className)}
            onClick={() => signIn('spotify')}
            {...props}
        >
            <Image
                className='h-10 w-auto'
                src='/spotify-logo.png'
                alt=''
                width='100'
                height='100'
            />
            <span className='text-[#1DB954]'>Sign In</span>
        </button>
    );
}
