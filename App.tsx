import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import SideNav from './components/SideNav';
import ProductList from './components/ProductList';
import CartModal from './components/CartModal';
import CheckoutModal from './components/CheckoutModal';
import ChatBot from './components/ChatBot';
import Footer from './components/Footer';
import ImageEditor from './components/ImageEditor'; // Assuming you might want to open it from somewhere
import { Product, Combo, CartItem } from './types';

const App = () => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [isEditorOpen, setIsEditorOpen] = useState(false); // Example state to control ImageEditor

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

    const handleSelectCategory = (category: string) => {
        setSelectedCategory(category);
        setIsNavOpen(false); // Close nav on mobile after selection
    };

    return (
        <div className="font-sans flex flex-col min-h-screen bg-[#121212]">
            <Header 
                cartItemCount={cartItemCount} 
                onCartClick={() => setIsCartOpen(true)}
                onMenuClick={() => setIsNavOpen(true)}
            />
            <div className="flex-grow max-w-7xl mx-auto w-full flex">
                <SideNav 
                    selectedCategory={selectedCategory}
                    onSelectCategory={handleSelectCategory}
                    isOpen={isNavOpen}
                    onClose={() => setIsNavOpen(false)}
                />
                <main className="flex-grow px-4 sm:px-6 lg:px-8 py-8 w-full">
                    <ProductList onAddToCart={handleAddToCart} selectedCategory={selectedCategory} />
                </main>
            </div>
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
            <ImageEditor 
                isOpen={isEditorOpen}
                onClose={() => setIsEditorOpen(false)}
            />
            <ChatBot />
        </div>
    );
};

export default App;