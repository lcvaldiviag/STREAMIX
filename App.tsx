
import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import ProductList from './components/ProductList';
import CartModal from './components/CartModal';
import CheckoutModal from './components/CheckoutModal';
import ChatBot from './components/ChatBot';
import Footer from './components/Footer';
import SideNav from './components/SideNav';
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
    
    // DEFINICIÓN: Detección automática de tema basado en horario local
    // Si es de noche (18:00 - 06:00), se activa el modo oscuro por defecto.
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const hour = new Date().getHours();
        return hour >= 18 || hour < 6;
    });

    const cartItemCount = useMemo(() => cart.reduce((count, item) => count + item.quantity, 0), [cart]);

    const handleAddToCart = (itemToAdd: Product | Combo, quantity: number = 1) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === itemToAdd.id);
            if (existingItem) {
                return prevCart.map(item =>
                    item.id === itemToAdd.id ? { ...item, quantity: item.quantity + quantity } : item
                );
            }
            return [...prevCart, { ...itemToAdd, quantity }];
        });
    };

    const handleQuickAddToCart = (itemToAdd: Product | Combo) => {
        handleAddToCart(itemToAdd);
        setToast({ message: `¡${itemToAdd.name} añadido al carrito!`, visible: true });
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
        setCart([]); 
    };

    const handleProductSelect = (product: Product | Combo) => {
        setSelectedProduct(product);
    };

    const handleCloseDetail = () => {
        setSelectedProduct(null);
    };

    const handleHideToast = () => {
        setToast(prev => ({ ...prev, visible: false }));
    };

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <div className={isDarkMode ? 'dark' : ''}>
            <div className="font-sans flex flex-col min-h-screen streamix-glass-bg relative bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-200 transition-colors duration-500">
                {/* Background Orbs for Fractal Effect */}
                <div className="glass-orb-1"></div>
                <div className="glass-orb-2"></div>

                <Header 
                    cartItemCount={cartItemCount} 
                    onCartClick={() => setIsCartOpen(true)}
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    onNavToggle={() => setIsNavOpen(!isNavOpen)}
                    isNavOpen={isNavOpen}
                    isDarkMode={isDarkMode}
                    onToggleTheme={toggleTheme}
                />
                
                {isNavOpen && (
                    <div 
                        className="fixed inset-0 top-20 bg-black/60 backdrop-blur-sm z-30 lg:hidden transition-all duration-300"
                        onClick={() => setIsNavOpen(false)}
                        aria-hidden="true"
                    ></div>
                )}

                <div className="lg:hidden">
                    <SideNav 
                        selectedCategory={selectedCategory}
                        onSelectCategory={(category) => {
                            setSelectedCategory(category);
                            setIsNavOpen(false);
                        }}
                        isOpen={isNavOpen}
                        searchQuery={searchQuery}
                        onSearchChange={setSearchQuery}
                    />
                </div>

                <div className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex relative z-10">
                    <div className="hidden lg:block">
                        <SideNav 
                            selectedCategory={selectedCategory}
                            onSelectCategory={(category) => {
                                setSelectedCategory(category);
                                setIsNavOpen(false);
                            }}
                            isOpen={isNavOpen}
                            searchQuery={searchQuery}
                            onSearchChange={setSearchQuery}
                        />
                    </div>
                    
                    <main className="flex-grow py-8 pl-0 lg:pl-8 w-full">
                        <ProductList 
                            onAddToCart={handleQuickAddToCart}
                            onProductSelect={handleProductSelect}
                            selectedCategory={selectedCategory}
                            searchQuery={searchQuery}
                        />
                    </main>
                </div>
                 <ProductDetail
                    product={selectedProduct}
                    onClose={handleCloseDetail}
                    onAddToCart={handleQuickAddToCart}
                />
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
                <ChatBot visible={!isCartOpen && !isCheckoutOpen && !selectedProduct} />
                <Toast message={toast.message} isVisible={toast.visible} onClose={handleHideToast} />
            </div>
        </div>
    );
};

export default App;
