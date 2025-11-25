import React, { useState, useEffect, useRef } from 'react';

const StreamixLogo = () => (
    <div className="flex items-center space-x-3 group cursor-pointer select-none">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center transition-transform duration-300 ease-out group-hover:scale-105 group-hover:rotate-12 shadow-md group-hover:shadow-indigo-500/30">
            <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 group-hover:from-indigo-600 group-hover:via-purple-600 group-hover:to-pink-600 transition-all duration-300">
            STREAMIX
        </h1>
    </div>
);

const SearchIcon = ({ className = "h-5 w-5 text-gray-400" }: { className?: string }) => (
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

interface HeaderProps {
    cartItemCount: number;
    onCartClick: () => void;
    searchQuery: string;
    onSearchChange: (query: string) => void;
    onNavToggle: () => void;
    isNavOpen: boolean;
}

const Header = ({ cartItemCount, onCartClick, searchQuery, onSearchChange, onNavToggle, isNavOpen }: HeaderProps) => {
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
        <header className="sticky top-0 z-50 w-full bg-white/60 backdrop-blur-lg border-b border-white/40 shadow-sm transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex items-center">
                        <button
                            onClick={onNavToggle}
                            className="lg:hidden p-2 -ml-2 mr-2 rounded-xl text-gray-600 hover:bg-white/50 transition-colors focus:outline-none"
                            aria-label={isNavOpen ? "Cerrar menú" : "Abrir menú"}
                        >
                            <MenuIcon isOpen={isNavOpen} />
                        </button>
                        <StreamixLogo />
                    </div>
                    <div className="flex items-center space-x-2 md:space-x-6">
                        <div className="hidden md:flex relative w-full max-w-sm group">
                             <span className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors group-focus-within:text-indigo-500">
                                <SearchIcon />
                            </span>
                            <input
                                type="text"
                                placeholder="Buscar productos..."
                                value={searchQuery}
                                onChange={(e) => onSearchChange(e.target.value)}
                                className="w-64 focus:w-80 transition-all duration-300 bg-white/50 border border-slate-200 rounded-full py-2.5 pl-11 pr-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white focus:border-transparent shadow-sm"
                            />
                        </div>
                        <button
                            onClick={onNavToggle}
                            className="md:hidden p-2 rounded-full text-gray-600 hover:bg-white/50"
                            aria-label="Buscar productos"
                        >
                            <SearchIcon className="h-6 w-6" />
                        </button>
                        <button
                            onClick={onCartClick}
                            className={`relative p-2.5 rounded-full text-gray-600 hover:bg-white/50 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-indigo-500 transition-all duration-300 ${isAnimating ? 'scale-110 bg-indigo-50 text-indigo-600 ring-2 ring-indigo-200' : ''}`}
                        >
                            <span className="sr-only">Abrir carrito</span>
                            <ShoppingCartIcon />
                            {cartItemCount > 0 && (
                                <span className={`absolute -top-0.5 -right-0.5 block h-5 w-5 rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold flex items-center justify-center ring-2 ring-white shadow-sm transition-transform duration-300 ${isAnimating ? 'scale-125' : ''}`}>
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