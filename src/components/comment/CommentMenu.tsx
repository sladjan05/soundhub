'use client';

import MoreIcon from '@/icons/MoreIcon';
import ReportIcon from '@/icons/ReportIcon';
import TrashIcon from '@/icons/TrashIcon';
import { Comment } from '@/models/Comment';
import cn from '@/utils/cn';
import { ElementProps } from '@/utils/types';
import { useRouter } from 'next/navigation';
import { useToast } from '../ToastProvider';
import { trpc } from '../TrpcProvider';

export default function CommentMenu({
    className,
    comment,

    ...props
}: ElementProps<'div'> & { comment: Comment }) {
    const router = useRouter();
    const { showToast } = useToast();

    const { isLoading: isDeleting, mutate: deleteComment } =
        trpc.sounds.deleteComment.useMutation({
            onSuccess() {
                showToast('Comment has been deleted.');
                router.refresh();
            }
        });

    return (
        <div className={cn('dropdown dropdown-bottom', className)} {...props}>
            <label className='btn rounded-full p-0' tabIndex={0}>
                <MoreIcon />
            </label>
            <ul
                className='menu dropdown-content join join-vertical z-10 h-fit w-52 translate-y-2 rounded-lg bg-base-100 p-2'
                tabIndex={0}
            >
                <li>
                    <button className='join-item bg-neutral'>Example</button>
                </li>
                <li>
                    <button
                        className='join-item flex flex-row items-center bg-error'
                        disabled={isDeleting}
                        onClick={() => deleteComment({ id: comment.id })}
                    >
                        <TrashIcon className='h-4 w-4' />
                        <span className='font-bold'>Delete</span>
                    </button>
                </li>
                <li>
                    <a className='join-item flex flex-row items-center bg-error'>
                        <ReportIcon className='h-4 w-4' />
                        <span className='font-bold'>Report</span>
                    </a>
                </li>
            </ul>
        </div>
    );
}
