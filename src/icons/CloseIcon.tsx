import cn from '@/utils/cn';
import { ElementProps } from '@/utils/types';

export default function CloseIcon({
    className,
    ...props
}: ElementProps<'svg'>) {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            className={cn('h-6 w-6', className)}
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            {...props}
        >
            <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M6 18L18 6M6 6l12 12'
            />
        </svg>
    );
}
