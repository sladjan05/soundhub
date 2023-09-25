import AuthSessionProvider from '@/components/AuthSessionProvider';
import NavBar from '@/components/NavBar';
import ToastProvider from '@/components/ToastProvider';
import TrpcProvider from '@/components/TrpcProvider';
import getAuthSession from '@/data/auth/getAuthSession';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
    title: 'soundhub',
    description: 'Share your thoughts...'
};

export default async function RootLayout({
    children
}: {
    children: React.ReactNode;
}) {
    const session = await getAuthSession();

    return (
        <html lang='en'>
            <body className='relative flex w-screen flex-col gap-y-10 overflow-x-clip overflow-y-scroll px-3 py-2'>
                <TrpcProvider>
                    <ToastProvider>
                        <AuthSessionProvider session={session}>
                            <NavBar className='fixed top-0' />
                            <div className='w-full pt-28'>{children}</div>
                        </AuthSessionProvider>
                    </ToastProvider>
                </TrpcProvider>
            </body>
        </html>
    );
}
