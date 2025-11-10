import React from 'react';
import { CartItem } from '../types';
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
        <div className="fixed inset-0 bg-black bg-opacity-70 z-40 transition-opacity" onClick={onClose}>
            <div 
                className="fixed top-0 right-0 h-full w-full max-w-md bg-[#1E1E3F] shadow-2xl flex flex-col border-l border-gray-700"
                onClick={e => e.stopPropagation()}
            >
                <header className="p-4 flex justify-between items-center border-b border-gray-700">
                    <h2 className="text-xl font-semibold text-white">Shopping Cart</h2>
                    <button onClick={onClose} className="p-2 rounded-full text-gray-300 hover:bg-white/10">
                        <CloseIcon />
                    </button>
                </header>
                <main className="flex-1 overflow-y-auto p-4">
                    {cartItems.length === 0 ? (
                        <p className="text-gray-400 text-center mt-8">Your cart is empty.</p>
                    ) : (
                        <ul className="divide-y divide-gray-700">
                            {cartItems.map(item => (
                                <li key={item.id} className="py-4 flex items-center space-x-4">
                                    <div className="flex-shrink-0">
                                        {'logo' in item ? <PlaceholderIcon icon={item.logo} /> : <img src={(item as any).image} alt={item.name} className="w-16 h-16 rounded-md object-cover" />}
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold text-gray-100">{item.name}</p>
                                        <p className="text-sm text-gray-400">${item.priceUSD.toFixed(2)}</p>
                                        <div className="flex items-center mt-2">
                                            <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} className="px-2 py-1 border border-gray-600 rounded-md text-gray-300 hover:bg-gray-700 transition-colors">-</button>
                                            <span className="px-3 font-medium text-gray-200">{item.quantity}</span>
                                            <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} className="px-2 py-1 border border-gray-600 rounded-md text-gray-300 hover:bg-gray-700 transition-colors">+</button>
                                        </div>
                                    </div>
                                    <button onClick={() => onRemoveItem(item.id)} className="flex items-center text-sm text-red-500 hover:text-red-400 transition-colors">
                                        <TrashIcon />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </main>
                {cartItems.length > 0 && (
                    <footer className="p-4 border-t border-gray-700 bg-black/20">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-lg font-semibold text-gray-200">Subtotal:</span>
                            <span className="text-xl font-bold text-white">${subtotal.toFixed(2)}</span>
                        </div>
                        <button 
                            onClick={onCheckout}
                            className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold rounded-xl shadow-md hover:opacity-90 transition-opacity"
                        >
                            Proceed to Checkout
                        </button>
                    </footer>
                )}
            </div>
        </div>
    );
};

export default CartModal;