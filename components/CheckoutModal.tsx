import React from 'react';
import { CartItem } from '../types';
import { QR_CODE_URL, WHATSAPP_NUMBER } from '../constants';

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

interface CheckoutModalProps {
    isOpen: boolean;
    onClose: () => void;
    cartItems: CartItem[];
}

const CheckoutModal = ({ isOpen, onClose, cartItems }: CheckoutModalProps) => {
    if (!isOpen) return null;

    const total = cartItems.reduce((sum, item) => sum + item.priceUSD * item.quantity, 0);
    const productNames = cartItems.map(item => `${item.name} (x${item.quantity})`).join(', ');
    const whatsappMessage = `Hola STREAMIX, ya realicé mi pago de ${total.toFixed(2)} USD por: ${productNames}. Adjunto mi comprobante.`;
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
            <div className="bg-[#1E1E3F] border border-gray-700 rounded-2xl shadow-2xl w-full max-w-md flex flex-col max-h-[95vh]">
                <header className="p-4 flex justify-between items-center border-b border-gray-700 flex-shrink-0">
                    <h2 className="text-xl font-bold text-white">Complete Your Purchase</h2>
                    <button onClick={onClose} className="p-2 rounded-full text-gray-300 hover:bg-white/10">
                        <CloseIcon />
                    </button>
                </header>
                <main className="p-6 text-center overflow-y-auto">
                    <h3 className="text-lg font-semibold text-gray-100 mb-2">Pay in Dollars (USD)</h3>
                    <p className="text-gray-400 mb-4">Please scan the QR code below with your preferred payment app.</p>
                    <div className="flex justify-center mb-4 bg-white p-2 rounded-xl">
                        <img src={QR_CODE_URL} alt="Payment QR Code" className="w-48 h-48 rounded-lg" />
                    </div>

                    <div className="text-sm text-left text-blue-200 my-4 p-3 bg-blue-900/40 rounded-xl border border-blue-500/30">
                        <p className="font-semibold text-blue-300">Other Payment Methods</p>
                        <p className="mt-1">
                            For payments in <strong>Bs. by Bank Transfer</strong> and <strong>USDT via Binance</strong> (international payments), contact us on WhatsApp for details.
                        </p>
                    </div>
                    
                    <div className="text-left bg-black/30 p-3 rounded-xl mb-4 border border-gray-700">
                        <p className="font-semibold text-gray-200">Order Summary:</p>
                        <ul className="text-sm text-gray-400 list-disc list-inside">
                            {cartItems.map(item => <li key={item.id}>{item.name} x{item.quantity}</li>)}
                        </ul>
                        <p className="font-bold text-lg mt-2 text-right text-white">Total: ${total.toFixed(2)} USD</p>
                    </div>
                     <p className="text-sm text-gray-500 mb-4">After paying, please send us the receipt via WhatsApp to activate your products.</p>
                     <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-block py-3 px-4 bg-green-500 text-white font-bold rounded-xl shadow-md hover:bg-green-600 transition-colors"
                     >
                        💬 Pay and Send Receipt via WhatsApp
                    </a>
                </main>
                 <footer className="p-4 text-center text-xs text-gray-500 border-t border-gray-700 flex-shrink-0">
                    Thank you for your purchase!
                </footer>
            </div>
        </div>
    );
};

export default CheckoutModal;