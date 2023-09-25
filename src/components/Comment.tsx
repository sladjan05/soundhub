import { Comment } from '@/models/Comment';
import cn from '@/utils/cn';
import { timeAgoShort } from '@/utils/date';
import { ElementProps } from '@/utils/types';
import Image from 'next/image';
import CommentMenu from './comment/CommentMenu';

export default async function Comment({
    className,
    comment,

    ...props
}: ElementProps<'div'> & { comment: Comment }) {
    return (
        <div
            className={cn('flex w-full max-w-2xl flex-row gap-x-4', className)}
            {...props}
        >
            <div className='flex flex-col items-center'>
                <a href={`/user/${comment.author.id}`}>
                    <div className='avatar'>
                        <div className='mask mask-squircle w-12'>
                            <Image
                                src={
                                    comment.author.image ||
                                    `https://api.dicebear.com/7.x/initials/svg?seed=${comment.author.name}`
                                }
                                alt=''
                                width={100}
                                height={100}
                            />
                        </div>
                    </div>
                </a>
                <span className='text-xs text-neutral'>
                    {timeAgoShort(comment.createdAt)}
                </span>
            </div>
            <div className='flex flex-1 flex-col'>
                <a className='font-bold' href={`/user/${comment.author.id}`}>
                    {comment.author.name}
                </a>
                <span className='w-full max-w-full break-words text-justify'>
                    {comment.content}
                </span>
            </div>
            <div>
                <CommentMenu comment={comment} />
            </div>
        </div>
    );
}
