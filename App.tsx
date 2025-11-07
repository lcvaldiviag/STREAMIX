import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import ProductList from './components/ProductList';
import CartModal from './components/CartModal';
import CheckoutModal from './components/CheckoutModal';
import ChatBot from './components/ChatBot';
import Footer from './components/Footer';
import { Product, Combo, CartItem } from './types';

const App: React.FC = () => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

    const cartItemCount = useMemo(() => cart.reduce((count, item) => count + item.quantity, 0), [cart]);

    const handleAddToCart = (itemToAdd: Product | Combo) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === itemToAdd.id);
            if (existingItem) {
                return prevCart.map(item =>
                    item.id === itemToAdd.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevCart, { ...itemToAdd, quantity: 1 }];
        });
        setIsCartOpen(true);
    };

    const handleUpdateQuantity = (itemId: string, newQuantity: number) => {
        if (newQuantity <= 0) {
            handleRemoveItem(itemId);
        } else {
            setCart(prevCart => prevCart.map(item =>
                item.id === itemId ? { ...item, quantity: newQuantity } : item
            ));
        }
    };

    const handleRemoveItem = (itemId: string) => {
        setCart(prevCart => prevCart.filter(item => item.id !== itemId));
    };

    const handleProceedToCheckout = () => {
        if (cart.length > 0) {
            setIsCartOpen(false);
            setIsCheckoutOpen(true);
        }
    };

    const handleCloseCheckout = () => {
        setIsCheckoutOpen(false);
        setCart([]); // Clear cart after successful checkout simulation
    };

    return (
        <div className="font-sans flex flex-col min-h-screen bg-slate-50">
            <Header 
                cartItemCount={cartItemCount} 
                onCartClick={() => setIsCartOpen(true)}
            />
            <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
                <ProductList onAddToCart={handleAddToCart} />
            </main>
            <Footer />
            <CartModal
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                cartItems={cart}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={handleRemoveItem}
                onCheckout={handleProceedToCheckout}
            />
            <CheckoutModal
                isOpen={isCheckoutOpen}
                onClose={handleCloseCheckout}
                cartItems={cart}
            />
            <ChatBot />
        </div>
    );
};

export default App;