import cn from '@/utils/cn';
import { ElementProps } from '@/utils/types';

export default function ShareIcon({
    className,
    ...props
}: ElementProps<'svg'>) {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            className={cn('h-8 w-8', className)}
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            {...props}
        >
            <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M15 15l6-6m0 0l-6-6m6 6H9a6 6 0 000 12h3'
            />
        </svg>
    );
}
