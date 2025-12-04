
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
    const whatsappMessage = `Hola STREAMIX, deseo pagar el monto de ${total.toFixed(2)} USD por: ${productNames}.`;
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;

    return (
        <div className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl shadow-2xl w-full max-w-md flex flex-col max-h-[95vh] text-slate-800 dark:text-slate-200">
                <header className="p-4 flex justify-between items-center border-b border-slate-200 dark:border-white/10 flex-shrink-0">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">Completa Tu Compra</h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors">
                        <CloseIcon />
                    </button>
                </header>
                <main className="p-6 text-center overflow-y-auto custom-scrollbar">
                    <h3 className="text-lg font-semibold mb-2 text-indigo-600 dark:text-indigo-300">Pagar en Dólares (USD)</h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-4">Por favor, escanea el código QR a continuación con tu aplicación de pago preferida.</p>
                    <div className="flex justify-center mb-4 p-2 bg-white rounded-xl shadow-md dark:shadow-[0_0_20px_rgba(255,255,255,0.1)] border border-slate-200 dark:border-transparent">
                        <img src={QR_CODE_URL} alt="Código QR de pago" className="w-48 h-48 rounded-lg" />
                    </div>

                    <div className="text-sm text-left text-indigo-800 dark:text-indigo-200 my-4 p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl border border-indigo-200 dark:border-indigo-500/30">
                        <p className="font-semibold text-indigo-700 dark:text-indigo-300">Otros métodos de pago</p>
                        <p className="mt-1 text-slate-700 dark:text-slate-300">
                            Para pagos en <strong>Bs. por Transferencia Bancaria</strong> y <strong>USDT por Binance</strong> (pagos internacionales), contáctanos por WhatsApp para darte los detalles.
                        </p>
                    </div>
                    
                    <div className="text-left bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-white/5 p-3 rounded-xl mb-4">
                        <p className="font-semibold text-slate-700 dark:text-slate-300">Resumen del Pedido:</p>
                        <ul className="text-sm text-slate-600 dark:text-slate-400 list-disc list-inside">
                            {cartItems.map(item => <li key={item.id}>{item.name} x{item.quantity}</li>)}
                        </ul>
                        <p className="font-bold text-lg mt-2 text-right text-slate-900 dark:text-white">Total: ${total.toFixed(2)} USD</p>
                    </div>
                     <p className="text-sm text-slate-500 mb-4">Envíanos tu pedido vía WhatsApp para coordinar el pago y la entrega.</p>
                     <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-block py-3 px-4 bg-green-700 text-white font-bold rounded-xl shadow-lg hover:bg-green-600 hover:shadow-md transition-all"
                     >
                        💬 Realizar Pedido por WhatsApp
                    </a>
                </main>
                 <footer className="p-4 text-center text-xs text-slate-500 dark:text-slate-600 border-t border-slate-200 dark:border-white/10 flex-shrink-0 bg-slate-50 dark:bg-slate-950 rounded-b-2xl">
                    ¡Gracias por tu compra!
                </footer>
            </div>
        </div>
    );
};

export default CheckoutModal;
