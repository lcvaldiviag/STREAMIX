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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md flex flex-col max-h-[95vh] text-gray-800">
                <header className="p-4 flex justify-between items-center border-b border-gray-200 flex-shrink-0">
                    <h2 className="text-xl font-bold">Completa Tu Compra</h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100">
                        <CloseIcon />
                    </button>
                </header>
                <main className="p-6 text-center overflow-y-auto bg-slate-50">
                    <h3 className="text-lg font-semibold mb-2">Pagar en Dólares (USD)</h3>
                    <p className="text-gray-600 mb-4">Por favor, escanea el código QR a continuación con tu aplicación de pago preferida.</p>
                    <div className="flex justify-center mb-4 p-2 bg-white rounded-xl shadow-inner">
                        <img src={QR_CODE_URL} alt="Código QR de pago" className="w-48 h-48 rounded-lg" />
                    </div>

                    <div className="text-sm text-left text-indigo-800 my-4 p-3 bg-indigo-100/60 rounded-xl border border-indigo-200">
                        <p className="font-semibold text-indigo-900">Otros métodos de pago</p>
                        <p className="mt-1">
                            Para pagos en <strong>Bs. por Transferencia Bancaria</strong> y <strong>USDT por Binance</strong> (pagos internacionales), contáctanos por WhatsApp para darte los detalles.
                        </p>
                    </div>
                    
                    <div className="text-left bg-slate-100 p-3 rounded-xl mb-4">
                        <p className="font-semibold">Resumen del Pedido:</p>
                        <ul className="text-sm text-gray-700 list-disc list-inside">
                            {cartItems.map(item => <li key={item.id}>{item.name} x{item.quantity}</li>)}
                        </ul>
                        <p className="font-bold text-lg mt-2 text-right">Total: ${total.toFixed(2)} USD</p>
                    </div>
                     <p className="text-sm text-gray-600 mb-4">Después de pagar, por favor envíanos el recibo vía WhatsApp para activar tus productos.</p>
                     <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-block py-3 px-4 bg-green-500 text-white font-bold rounded-xl shadow-md hover:bg-green-600 transition-colors"
                     >
                        💬 Pagar y Enviar Recibo por WhatsApp
                    </a>
                </main>
                 <footer className="p-4 text-center text-xs text-gray-500 border-t border-gray-200 flex-shrink-0 bg-white rounded-b-2xl">
                    ¡Gracias por tu compra!
                </footer>
            </div>
        </div>
    );
};

export default CheckoutModal;