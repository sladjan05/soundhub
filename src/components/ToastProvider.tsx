'use client';

import useTimed from '@/hooks/useTimed';
import cn from '@/utils/cn';
import { ReactNode, createContext, useContext } from 'react';

const ToastContext = createContext({
    showToast: (message: string) => {}
});

export function useToast() {
    return useContext(ToastContext);
}

export default function ToastProvider({ children }: { children: ReactNode }) {
    const [message, setMessage] = useTimed<string | null>(null);

    return (
        <>
            <ToastContext.Provider value={{ showToast: setMessage }}>
                {children}
            </ToastContext.Provider>
            <div
                className={cn(
                    'toast toast-start origin-bottom-left scale-0 opacity-0 transition-all',
                    { 'scale-100 opacity-100': message }
                )}
            >
                <div className='alert alert-info flex'>
                    <span>{message}</span>
                </div>
            </div>
        </>
    );
}
