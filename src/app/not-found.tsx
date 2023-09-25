export default function NotFound() {
    return (
        <div className='flex h-[80vh] w-full flex-col items-center justify-center'>
            <div className='flex flex-row gap-x-2'>
                <span className='text-2xl font-bold'>404</span>
                <span className='h-full w-px rounded-full bg-white' />
                <span className='text-2xl text-neutral'>Not Found</span>
            </div>
        </div>
    );
}
