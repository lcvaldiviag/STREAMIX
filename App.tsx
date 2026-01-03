
import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import ProductList from './components/ProductList';
import CartModal from './components/CartModal';
import CheckoutModal from './components/CheckoutModal';
import ChatBot from './components/ChatBot';
import Footer from './components/Footer';
import ProductDetail from './components/ProductDetail';
import Toast from './components/Toast';
import { Product, Combo, CartItem, Category } from './types';

const App = () => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<Category | 'Todos los Productos'>('Todos los Productos');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedProduct, setSelectedProduct] = useState<Product | Combo | null>(null);
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [toast, setToast] = useState<{ message: string; visible: boolean }>({ message: '', visible: false });
    const [isDarkMode, setIsDarkMode] = useState(true);

    useEffect(() => {
        if (isDarkMode) {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
    }, [isDarkMode]);

    const cartItemCount = useMemo(() => cart.reduce((count, item) => count + item.quantity, 0), [cart]);

    const handleQuickAddToCart = (itemToAdd: Product | Combo) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === itemToAdd.id);
            if (existingItem) {
                return prevCart.map(item =>
                    item.id === itemToAdd.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevCart, { ...itemToAdd, quantity: 1 }];
        });
        setToast({ message: `¡${itemToAdd.name} añadido!`, visible: true });
    };

    const toggleTheme = () => setIsDarkMode(!isDarkMode);
    const toggleCart = () => setIsCartOpen(!isCartOpen);

    return (
        <div className={isDarkMode ? 'dark' : ''}>
            <div className="flex flex-col min-h-screen">
                <Header 
                    cartItemCount={cartItemCount} 
                    onCartClick={toggleCart}
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    onNavToggle={() => setIsNavOpen(!isNavOpen)}
                    isNavOpen={isNavOpen}
                    isDarkMode={isDarkMode}
                    onToggleTheme={toggleTheme}
                />

                <div className="flex-grow flex flex-col relative z-10 pt-24 lg:pt-28">
                    <main className="flex-grow pb-24">
                        <ProductList 
                            onAddToCart={handleQuickAddToCart}
                            onProductSelect={setSelectedProduct}
                            selectedCategory={selectedCategory}
                            onSelectCategory={(category) => {
                                setSelectedCategory(category);
                                setIsNavOpen(false);
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            searchQuery={searchQuery}
                            isDarkMode={isDarkMode}
                            isNavOpen={isNavOpen}
                            onSearchChange={setSearchQuery}
                        />
                    </main>

                    <Footer />
                </div>

                <ProductDetail
                    product={selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                    onAddToCart={handleQuickAddToCart}
                />
                
                <CartModal
                    isOpen={isCartOpen}
                    onClose={() => setIsCartOpen(false)}
                    cartItems={cart}
                    onUpdateQuantity={(id, q) => setCart(p => p.map(i => i.id === id ? {...i, quantity: q} : i))}
                    onRemoveItem={(id) => setCart(p => p.filter(i => i.id !== id))}
                    onCheckout={() => { setIsCartOpen(false); setIsCheckoutOpen(true); }}
                />

                <CheckoutModal
                    isOpen={isCheckoutOpen}
                    onClose={() => { setIsCheckoutOpen(false); setCart([]); }}
                    cartItems={cart}
                />

                <ChatBot visible={!isCartOpen && !isCheckoutOpen && !selectedProduct} />
                <Toast message={toast.message} isVisible={toast.visible} onClose={() => setToast(p => ({...p, visible: false}))} />
            </div>
        </div>
    );
};

export default App;
