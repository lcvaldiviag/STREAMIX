
import React from 'react';
import { Product, Combo } from '../types';

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

interface ProductDetailProps {
    product: Product | Combo | null;
    onClose: () => void;
    onAddToCart: (item: Product | Combo) => void;
}

const isProduct = (item: Product | Combo): item is Product => 'logo' in item;

const ProductDetail = ({ product, onClose, onAddToCart }: ProductDetailProps) => {
    const isVisible = product !== null;

    if (!product) return null;

    const brandColor = isProduct(product) ? product.brandColor : '#6366F1'; // Default to indigo
    const isSoldOut = isProduct(product) ? product.soldOut : false;

    return (
        <>
            {/* Overlay - Very High z-index to sit above everything */}
            <div 
                className={`fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm z-[190] transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
            ></div>

            {/* Panel - Highest z-index to ensure it covers ChatBot (z-80) and any other floating elements */}
            <aside 
                className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white dark:bg-slate-900 shadow-2xl border-l border-slate-200 dark:border-white/10 z-[200] transform transition-transform duration-300 ease-in-out ${isVisible ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <div className="flex flex-col h-full text-slate-800 dark:text-slate-200">
                    <header className="p-4 flex justify-between items-center border-b border-slate-200 dark:border-white/10 flex-shrink-0">
                        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Detalles del Producto</h2>
                        <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 text-slate-500 dark:text-slate-300 transition-colors">
                            <CloseIcon />
                        </button>
                    </header>

                    <main className="flex-1 overflow-y-auto p-6">
                        {isProduct(product) ? (
                            <div className="flex flex-col items-center text-center">
                                <div className="p-4 rounded-xl border border-slate-200 dark:border-white/5 shadow-lg dark:shadow-[0_0_20px_rgba(0,0,0,0.3)]" style={{ backgroundColor: isProduct(product) ? `${brandColor}20` : 'transparent' }}>
                                    <span className="text-6xl font-bold drop-shadow-lg filter" style={{ color: brandColor }}>
                                        {product.logo}
                                    </span>
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-4 tracking-tight">{product.name}</h3>
                            </div>
                        ) : (
                             <div className="flex flex-col items-center text-center">
                                <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-lg shadow-lg mb-4 border border-slate-200 dark:border-white/10" />
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">{product.name}</h3>
                             </div>
                        )}
                        
                        <p className="text-slate-600 dark:text-slate-400 mt-4 text-center leading-relaxed">
                            {isProduct(product) ? product.description : `Incluye: ${product.included.join(', ')}`}
                        </p>

                    </main>

                    <footer className="p-6 border-t border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-950 flex-shrink-0">
                        <div className="flex justify-between items-center mb-4">
                            <p className="text-sm text-slate-500 uppercase font-bold tracking-wider">Precio</p>
                            <div className="text-right">
                                <p className="text-2xl font-black text-indigo-600 dark:text-indigo-400 drop-shadow-sm dark:drop-shadow-[0_0_10px_rgba(129,140,248,0.3)]">${product.priceUSD.toFixed(2)}</p>
                                <p className="text-sm text-slate-500">BS. {product.priceBS.toFixed(2)}</p>
                            </div>
                        </div>
                        <button 
                            onClick={() => {
                                if (!isSoldOut) {
                                    onAddToCart(product);
                                    onClose(); // Optionally close panel after adding
                                }
                            }}
                            disabled={isSoldOut}
                            className={`w-full py-3 text-white font-bold rounded-xl shadow-lg transition-all ${
                                isSoldOut 
                                ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed border border-slate-300 dark:border-slate-700' 
                                : 'bg-gradient-to-r from-indigo-700 to-purple-700 hover:from-indigo-600 hover:to-purple-600 hover:shadow-lg'
                            }`}
                        >
                            {isSoldOut ? 'Agotado' : 'Añadir al Carrito'}
                        </button>
                    </footer>
                </div>
            </aside>
        </>
    );
};

export default ProductDetail;
