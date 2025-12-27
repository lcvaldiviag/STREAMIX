
import React, { useState, useEffect, useRef } from 'react';

// Exportamos StreamixLogo y se añade soporte para className para permitir un ajuste de tamaño flexible en el título principal.
export const StreamixLogo = ({ isDarkMode, className }: { isDarkMode: boolean; className?: string }) => (
    <div className={`relative flex items-center group cursor-pointer select-none ${className || ''}`}>
        <div className="logo-wrapper transition-transform duration-300 group-hover:scale-105" style={{ width: '100%' }}>
            {/* Contenedor con Aspect Ratio mantenido */}
            <div style={{ 
                position: 'relative', 
                width: '100%', 
                height: '0', 
                paddingTop: '33.3333%', 
                overflow: 'hidden', 
                willChange: 'transform' 
            }}>
                {/* Logo Modo Claro */}
                <div className={`absolute inset-0 transition-opacity duration-300 ${isDarkMode ? 'opacity-0' : 'opacity-100'}`}>
                    <iframe 
                        loading="lazy" 
                        style={{ 
                            position: 'absolute', 
                            width: '100%', 
                            height: '100%', 
                            top: '0', 
                            left: '0', 
                            border: 'none', 
                            padding: '0', 
                            margin: '0', 
                            pointerEvents: 'none' 
                        }}
                        src="https://www.canva.com/design/DAG8QHpO2OI/egldNQwoS13TJaWXxcZUHw/view?embed"
                        title="STREAMIX Light Logo"
                    />
                </div>

                {/* Logo Modo Oscuro (DAG8QMGm2Y8) */}
                <div className={`absolute inset-0 transition-opacity duration-300 ${isDarkMode ? 'opacity-100' : 'opacity-0'}`}>
                    <iframe 
                        loading="lazy" 
                        style={{ 
                            position: 'absolute', 
                            width: '100%', 
                            height: '100%', 
                            top: '0', 
                            left: '0', 
                            border: 'none', 
                            padding: '0', 
                            margin: '0', 
                            pointerEvents: 'none' 
                        }}
                        src="https://www.canva.com/design/DAG8QMGm2Y8/Vmb-gO9Quw-pZcmViXdiTw/view?embed"
                        title="STREAMIX Dark Logo"
                    />
                </div>
            </div>
        </div>
    </div>
);

const SearchIcon = ({ className = "h-5 w-5 text-slate-400" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);

const ShoppingCartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
);

const MenuIcon = ({ isOpen }: { isOpen: boolean }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transform transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        )}
    </svg>
);

const SunIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
);

const MoonIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
);

interface HeaderProps {
    cartItemCount: number;
    onCartClick: () => void;
    searchQuery: string;
    onSearchChange: (query: string) => void;
    onNavToggle: () => void;
    isNavOpen: boolean;
    isDarkMode: boolean;
    onToggleTheme: () => void;
}

const Header = ({ cartItemCount, onCartClick, searchQuery, onSearchChange, onNavToggle, isNavOpen, isDarkMode, onToggleTheme }: HeaderProps) => {
    const [isAnimating, setIsAnimating] = useState(false);
    const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
    const prevCountRef = useRef(cartItemCount);
    const mobileSearchRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (cartItemCount > prevCountRef.current) {
            setIsAnimating(true);
            const timer = setTimeout(() => setIsAnimating(false), 300);
            return () => clearTimeout(timer);
        }
        prevCountRef.current = cartItemCount;
    }, [cartItemCount]);

    useEffect(() => {
        if (isMobileSearchOpen && mobileSearchRef.current) {
            mobileSearchRef.current.focus();
        }
    }, [isMobileSearchOpen]);

    return (
        <header className="sticky top-0 z-50 w-full glass-panel border-b border-slate-200/50 dark:border-white/5 shadow-lg transition-all duration-300 bg-white/80 dark:bg-slate-900/65">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-between h-20">
                    
                    {/* Contenedor Izquierda: Menu & Logo (Visible si no hay búsqueda móvil) */}
                    <div className={`flex items-center transition-opacity duration-300 ${isMobileSearchOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                        <button
                            onClick={onNavToggle}
                            className="lg:hidden p-2 -ml-2 mr-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 hover:text-indigo-600 dark:hover:text-white transition-colors focus:outline-none"
                            aria-label={isNavOpen ? "Cerrar menú" : "Abrir menú"}
                        >
                            <MenuIcon isOpen={isNavOpen} />
                        </button>
                    </div>

                    {/* Barra de Búsqueda Móvil Expandible */}
                    <div className={`absolute inset-0 z-10 flex items-center bg-white dark:bg-slate-900 md:hidden transition-all duration-300 transform ${isMobileSearchOpen ? 'translate-y-0 opacity-100 visible' : '-translate-y-4 opacity-0 invisible pointer-events-none'}`}>
                        <div className="flex items-center w-full px-2 space-x-2">
                             <span className="pl-2">
                                <SearchIcon />
                            </span>
                            <input
                                ref={mobileSearchRef}
                                type="text"
                                placeholder="Buscar productos..."
                                value={searchQuery}
                                onChange={(e) => onSearchChange(e.target.value)}
                                className="flex-1 bg-transparent border-none py-2 text-slate-800 dark:text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-0"
                            />
                            <button 
                                onClick={() => { setIsMobileSearchOpen(false); onSearchChange(''); }}
                                className="p-2 text-slate-500 hover:text-indigo-600"
                                aria-label="Cerrar búsqueda"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Contenedor Derecha: Búsqueda, Temas y Carrito */}
                    <div className={`flex items-center space-x-2 md:space-x-4 transition-opacity duration-300 ${isMobileSearchOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                        {/* Búsqueda Escritorio (Desktop) */}
                        <div className="hidden md:flex relative group">
                             <span className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors group-focus-within:text-indigo-500 dark:group-focus-within:text-indigo-400">
                                <SearchIcon />
                            </span>
                            <input
                                type="text"
                                placeholder="Buscar productos..."
                                value={searchQuery}
                                onChange={(e) => onSearchChange(e.target.value)}
                                className="w-56 focus:w-64 lg:w-64 lg:focus:w-80 transition-all duration-300 bg-slate-100 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-700/50 rounded-full py-2.5 pl-11 pr-4 text-slate-800 dark:text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 dark:focus:bg-slate-900 focus:bg-white focus:border-indigo-500/50 shadow-inner"
                            />
                        </div>

                        {/* Botón Lupa Móvil (Mobile) */}
                        <button
                            onClick={() => setIsMobileSearchOpen(true)}
                            className="md:hidden p-2.5 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 hover:text-indigo-600 dark:hover:text-white"
                            aria-label="Buscar productos"
                        >
                            <SearchIcon className="h-6 w-6" />
                        </button>

                        <button
                            onClick={onToggleTheme}
                            className="p-2.5 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 hover:text-indigo-600 dark:hover:text-yellow-300 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                            aria-label={isDarkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
                        >
                            {isDarkMode ? <SunIcon /> : <MoonIcon />}
                        </button>

                        <button
                            onClick={onCartClick}
                            className={`relative p-2.5 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 hover:text-indigo-600 dark:hover:text-indigo-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-900 focus:ring-indigo-500 transition-all duration-300 ${isAnimating ? 'scale-110 bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 ring-2 ring-indigo-500/50' : ''}`}
                        >
                            <span className="sr-only">Abrir carrito</span>
                            <ShoppingCartIcon />
                            {cartItemCount > 0 && (
                                <span className={`absolute -top-0.5 -right-0.5 block h-5 w-5 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white dark:ring-slate-900 shadow-lg transition-transform duration-300 ${isAnimating ? 'scale-125' : ''}`}>
                                    {cartItemCount}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
