'use client';

import cn from '@/utils/cn';
import { ElementProps } from '@/utils/types';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import SearchBar from './SearchBar';
import SignInButton from './SignInButton';

export default function NavBar({ className, ...props }: ElementProps<'div'>) {
    const { data: session } = useSession();

    return (
        <div
            className={cn('navbar z-20 h-28 bg-base-100', className)}
            {...props}
        >
            <div className='navbar-start flex-1'>
                <a
                    className='btn btn-ghost gap-x-0 text-xl normal-case'
                    href='/'
                >
                    <span className='text-primary'>sound</span>
                    <span className='text-secondary'>hub</span>
                </a>
            </div>
            <div className='navbar-center hidden flex-1 lg:flex'>
                <SearchBar
                    className='w-full'
                    placeholder='Search soundhub...'
                    onChange={() => {}}
                />
            </div>
            <div className='navbar-end flex-1'>
                {!session && <SignInButton />}
                {session && (
                    <a
                        className='btn btn-ghost h-16 items-center gap-x-4 rounded-full'
                        href={`/user/${session.user.id}`}
                    >
                        <span className='text-lg font-normal normal-case'>
                            {session.user.name}
                        </span>
                        <div className='avatar'>
                            <div className='mask mask-squircle w-12'>
                                <Image
                                    src={
                                        session.user.image ||
                                        `https://api.dicebear.com/7.x/initials/svg?seed=${session.user.name}`
                                    }
                                    alt=''
                                    width={100}
                                    height={100}
                                />
                            </div>
                        </div>
                    </a>
                )}
            </div>
        </div>
    );
}
