
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
    // Función para detectar el tema basado en la hora local (6 AM a 6 PM = Claro)
    const getSystemTheme = () => {
        const hour = new Date().getHours();
        return hour < 6 || hour >= 18; // Noche = True (Oscuro), Día = False (Claro)
    };

    const [cart, setCart] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<Category | 'Todos los Productos'>('Todos los Productos');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedProduct, setSelectedProduct] = useState<Product | Combo | null>(null);
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [toast, setToast] = useState<{ message: string; visible: boolean }>({ message: '', visible: false });
    
    // El tema se inicializa automáticamente según la hora
    const [isDarkMode, setIsDarkMode] = useState(getSystemTheme());

    useEffect(() => {
        if (isDarkMode) {
            document.body.classList.add('dark');
            document.body.classList.remove('light-mode');
        } else {
            document.body.classList.remove('dark');
            document.body.classList.add('light-mode');
        }
    }, [isDarkMode]);

    // Opcional: Escuchar cambios de hora si la pestaña se queda abierta mucho tiempo
    useEffect(() => {
        const interval = setInterval(() => {
            const shouldBeDark = getSystemTheme();
            if (shouldBeDark !== isDarkMode) {
                setIsDarkMode(shouldBeDark);
            }
        }, 60000); // Revisar cada minuto
        return () => clearInterval(interval);
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
            <div className="flex flex-col min-h-screen relative overflow-x-hidden">
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
