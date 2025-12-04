
import React, { useEffect } from 'react';

interface ToastProps {
    message: string;
    isVisible: boolean;
    onClose: () => void;
}

const Toast = ({ message, isVisible, onClose }: ToastProps) => {
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                onClose();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [isVisible, onClose]);

    return (
        <div className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 z-[70] transition-all duration-500 ease-in-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}`}>
            <div className="bg-slate-900/90 backdrop-blur-md text-white px-6 py-3 rounded-full shadow-[0_0_20px_rgba(0,0,0,0.5)] flex items-center space-x-3 border border-white/10 ring-1 ring-white/5">
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-full p-1 shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <span className="font-medium text-sm sm:text-base tracking-wide text-slate-100">{message}</span>
            </div>
        </div>
    );
};

export default Toast;
