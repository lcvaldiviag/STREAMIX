import React from 'react';
import { Product, Combo } from '../types';
import { PlaceholderIcon } from '../constants';

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
                className={`fixed inset-0 bg-black z-[190] transition-opacity duration-300 ${isVisible ? 'opacity-50' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
            ></div>

            {/* Panel - Highest z-index to ensure it covers ChatBot (z-80) and any other floating elements */}
            <aside 
                className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white shadow-2xl z-[200] transform transition-transform duration-300 ease-in-out ${isVisible ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <div className="flex flex-col h-full">
                    <header className="p-4 flex justify-between items-center border-b border-gray-200 flex-shrink-0">
                        <h2 className="text-xl font-semibold text-gray-800">Detalles del Producto</h2>
                        <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100">
                            <CloseIcon />
                        </button>
                    </header>

                    <main className="flex-1 overflow-y-auto p-6">
                        {isProduct(product) ? (
                            <div className="flex flex-col items-center text-center">
                                <div className="p-4 rounded-xl" style={{ backgroundColor: `${brandColor}1A`}}>
                                    <span className="text-6xl font-bold" style={{ color: brandColor }}>
                                        {product.logo}
                                    </span>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mt-4">{product.name}</h3>
                            </div>
                        ) : (
                             <div className="flex flex-col items-center text-center">
                                <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-lg shadow-md mb-4" />
                                <h3 className="text-2xl font-bold text-gray-900">{product.name}</h3>
                             </div>
                        )}
                        
                        <p className="text-gray-600 mt-4 text-center">
                            {isProduct(product) ? product.description : `Incluye: ${product.included.join(', ')}`}
                        </p>

                    </main>

                    <footer className="p-6 border-t border-gray-200 bg-slate-50 flex-shrink-0">
                        <div className="flex justify-between items-center mb-4">
                            <p className="text-sm text-gray-500">Precio</p>
                            <div>
                                <p className="text-2xl font-bold text-indigo-600">${product.priceUSD.toFixed(2)}</p>
                                <p className="text-sm text-gray-500 text-right">BS. {product.priceBS.toFixed(2)}</p>
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
                            className={`w-full py-3 text-white font-bold rounded-xl shadow-md transition-colors ${
                                isSoldOut 
                                ? 'bg-gray-400 cursor-not-allowed hover:bg-gray-400' 
                                : 'bg-indigo-600 hover:bg-indigo-500'
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