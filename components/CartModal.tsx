
import React, { useState } from 'react';
import { CartItem, Product } from '../types';
import { PlaceholderIcon } from '../constants';

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const TrashIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
);

const CartImage = ({ src, alt, logo, color }: { src?: string; alt: string; logo?: string; color?: string }) => {
    const [error, setError] = useState(false);
    
    if (logo) return <PlaceholderIcon icon={logo} color={color} />;
    
    if (error || !src) {
        return (
            <div className="w-16 h-16 rounded-md bg-slate-200 dark:bg-slate-800 flex items-center justify-center border border-slate-300 dark:border-white/10">
                <span className="text-[10px] font-bold text-slate-400 uppercase">SMIX</span>
            </div>
        );
    }

    return (
        <img 
            src={src} 
            alt={alt} 
            onError={() => setError(true)}
            className="w-16 h-16 rounded-md object-cover border border-slate-200 dark:border-white/10" 
        />
    );
};

interface CartModalProps {
    isOpen: boolean;
    onClose: () => void;
    cartItems: CartItem[];
    onUpdateQuantity: (itemId: string, newQuantity: number) => void;
    onRemoveItem: (itemId: string) => void;
    onCheckout: () => void;
}

const CartModal = ({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem, onCheckout }: CartModalProps) => {
    if (!isOpen) return null;

    const subtotal = cartItems.reduce((sum, item) => sum + item.priceUSD * item.quantity, 0);

    return (
        <div className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm z-[200] transition-opacity" onClick={onClose}>
            <div 
                className="fixed top-0 right-0 h-full w-full max-w-md bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-white/10 shadow-2xl flex flex-col text-slate-800 dark:text-slate-200"
                onClick={e => e.stopPropagation()}
            >
                <header className="p-4 flex justify-between items-center border-b border-slate-200 dark:border-white/10">
                    <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Carrito de Compras</h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors">
                        <CloseIcon />
                    </button>
                </header>
                <main className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                    {cartItems.length === 0 ? (
                        <p className="text-slate-500 text-center mt-8">Tu carrito está vacío.</p>
                    ) : (
                        <ul className="divide-y divide-slate-200 dark:divide-white/5">
                            {cartItems.map(item => (
                                <li key={item.id} className="py-4 flex items-center space-x-4">
                                    <div className="flex-shrink-0">
                                        <CartImage 
                                            src={'image' in item ? (item as any).image : undefined} 
                                            alt={item.name}
                                            logo={'logo' in item ? (item as any).logo : undefined}
                                            color={'brandColor' in item ? (item as any).brandColor : undefined}
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold text-slate-900 dark:text-slate-200">{item.name}</p>
                                        <p className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                                            ${item.priceUSD.toFixed(2)}
                                        </p>
                                        <div className="flex items-center mt-2">
                                            <button 
                                                onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))} 
                                                className="px-2.5 py-1 border border-slate-300 dark:border-slate-600 rounded-md text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                                            >
                                                -
                                            </button>
                                            <span className="px-3 font-medium text-slate-800 dark:text-slate-200">{item.quantity}</span>
                                            <button 
                                                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} 
                                                className="px-2.5 py-1 border border-slate-300 dark:border-slate-600 rounded-md text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                    <button onClick={() => onRemoveItem(item.id)} className="flex items-center text-sm text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors">
                                        <TrashIcon />
                                        Eliminar
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </main>
                {cartItems.length > 0 && (
                    <footer className="p-4 border-t border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-950">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-lg font-semibold text-slate-600 dark:text-slate-400">Subtotal:</span>
                            <span className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 drop-shadow-sm">
                                ${subtotal.toFixed(2)}
                            </span>
                        </div>
                        <button 
                            onClick={onCheckout}
                            className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl shadow-lg hover:shadow-md hover:opacity-90 transition-all"
                        >
                            Proceder al Pago
                        </button>
                    </footer>
                )}
            </div>
        </div>
    );
};

export default CartModal;
