
import React, { useState, useEffect, useRef } from 'react';

const StreamixLogo = () => (
    <div className="flex items-center space-x-3 group cursor-pointer select-none">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center transition-transform duration-300 ease-out group-hover:scale-105 group-hover:rotate-6 shadow-[0_0_15px_rgba(99,102,241,0.5)] group-hover:shadow-[0_0_25px_rgba(168,85,247,0.6)] border border-white/10">
            <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-slate-800 via-slate-600 to-slate-400 dark:from-white dark:via-slate-200 dark:to-slate-400 group-hover:from-indigo-500 group-hover:via-purple-500 group-hover:to-pink-500 dark:group-hover:from-indigo-400 dark:group-hover:via-purple-400 dark:group-hover:to-pink-400 transition-all duration-300 drop-shadow-sm">
            STREAMIX
        </h1>
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
    const prevCountRef = useRef(cartItemCount);

    useEffect(() => {
        // Trigger animation only when items are added (count increases)
        if (cartItemCount > prevCountRef.current) {
            setIsAnimating(true);
            const timer = setTimeout(() => setIsAnimating(false), 300);
            return () => clearTimeout(timer);
        }
        prevCountRef.current = cartItemCount;
    }, [cartItemCount]);

    return (
        <header className="sticky top-0 z-50 w-full glass-panel border-b border-slate-200/50 dark:border-white/5 shadow-lg transition-all duration-300 bg-white/80 dark:bg-slate-900/65">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex items-center">
                        <button
                            onClick={onNavToggle}
                            className="lg:hidden p-2 -ml-2 mr-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 hover:text-indigo-600 dark:hover:text-white transition-colors focus:outline-none"
                            aria-label={isNavOpen ? "Cerrar menú" : "Abrir menú"}
                        >
                            <MenuIcon isOpen={isNavOpen} />
                        </button>
                        <StreamixLogo />
                    </div>
                    <div className="flex items-center space-x-2 md:space-x-4">
                        <div className="hidden md:flex relative w-full max-w-sm group">
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
                        <button
                            onClick={onNavToggle}
                            className="md:hidden p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 hover:text-indigo-600 dark:hover:text-white"
                            aria-label="Buscar productos"
                        >
                            <SearchIcon className="h-6 w-6" />
                        </button>

                        {/* Theme Toggle Button */}
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
