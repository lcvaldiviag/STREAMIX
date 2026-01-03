import React, { useState, useEffect } from 'react';

export const StreamixLogo = ({ isDarkMode, className }: { isDarkMode: boolean; className?: string }) => (
    <div 
        className={`relative flex items-center select-none bg-transparent border-none shadow-none ${className || ''}`}
    >
        <div 
            className="logo-wrapper w-full bg-transparent border-none shadow-none" 
        >
            <div style={{ 
                position: 'relative', 
                width: '100%', 
                height: '0', 
                paddingTop: '33.3333%', 
                overflow: 'hidden',
                background: 'transparent'
            }}>
                {/* Logo for Light Mode: Multiply removes white background */}
                <div 
                    className={`absolute inset-0 transition-opacity duration-500 ${isDarkMode ? 'opacity-0' : 'opacity-100'}`}
                    style={{ mixBlendMode: 'multiply', background: 'transparent' }}
                >
                    <iframe 
                        loading="lazy" 
                        style={{ position: 'absolute', width: '100%', height: '100%', top: '0', left: '0', border: 'none', padding: '0', margin: '0', pointerEvents: 'none', background: 'transparent' }} 
                        src="https://www.canva.com/design/DAG8QHpO2OI/egldNQwoS13TJaWXxcZUHw/view?embed" 
                        title="STREAMIX Light Logo" 
                    />
                </div>
                {/* Logo for Dark Mode: Screen removes black background */}
                <div 
                    className={`absolute inset-0 transition-opacity duration-500 ${isDarkMode ? 'opacity-100' : 'opacity-0'}`}
                    style={{ mixBlendMode: 'screen', background: 'transparent' }}
                >
                    <iframe 
                        loading="lazy" 
                        style={{ position: 'absolute', width: '100%', height: '100%', top: '0', left: '0', border: 'none', padding: '0', margin: '0', pointerEvents: 'none', background: 'transparent' }} 
                        src="https://www.canva.com/design/DAG8QMGm2Y8/Vmb-gO9Quw-pZcmViXdiTw/view?embed" 
                        title="STREAMIX Dark Logo" 
                    />
                </div>
            </div>
        </div>
    </div>
);

const SearchIcon = ({ className = "h-4 w-4 md:h-5 md:w-5 text-slate-400" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);

const ShoppingCartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
);

const SunIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l.707.707M6.343 6.343l.707-.707M12 5a7 7 0 100 14 7 7 0 000-14z" />
    </svg>
);

const MoonIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
);

const MenuIcon = ({ isOpen }: { isOpen: boolean }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        {isOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
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
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 30);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${scrolled ? 'py-1 md:py-2' : 'py-3 md:py-6'}`}>
            <div className={`mx-auto max-w-7xl px-2 md:px-6 lg:px-8`}>
                <div className={`relative flex items-center justify-between px-3 md:px-6 h-12 md:h-20 rounded-full transition-all duration-500 ${scrolled ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl border border-slate-200 dark:border-white/10 shadow-xl' : 'bg-transparent border-transparent'}`}>
                    <button onClick={onNavToggle} className="lg:hidden p-2 rounded-full text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors">
                        <MenuIcon isOpen={isNavOpen} />
                    </button>
                    
                    <div className="flex-1 max-w-xl mx-2 md:mx-8">
                        <div className="relative group">
                            <span className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2">
                                <SearchIcon />
                            </span>
                            <input
                                type="text"
                                placeholder="Buscar..."
                                value={searchQuery}
                                onChange={(e) => onSearchChange(e.target.value)}
                                className="w-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-full py-1.5 md:py-2.5 pl-9 md:pl-12 pr-4 md:pr-6 text-[13px] md:text-base text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:bg-white dark:focus:bg-white/10 transition-all shadow-sm"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-1.5 md:gap-3">
                        <button 
                            onClick={onToggleTheme} 
                            className="p-2 rounded-full bg-slate-100 dark:bg-white/5 text-slate-800 dark:text-white hover:scale-110 active:scale-95 transition-all shadow-sm border border-slate-200 dark:border-white/10"
                            title={isDarkMode ? "Modo claro" : "Modo oscuro"}
                        >
                            {isDarkMode ? <SunIcon /> : <MoonIcon />}
                        </button>
                        
                        <button onClick={onCartClick} className="relative p-2 rounded-full bg-indigo-600 text-white shadow-lg hover:scale-110 active:scale-95 transition-all">
                            <ShoppingCartIcon />
                            {cartItemCount > 0 && (
                                <span className="absolute -top-1 -right-1 flex h-4 w-4 md:h-6 md:w-6 items-center justify-center rounded-full bg-white text-indigo-600 text-[8px] md:text-[10px] font-black shadow-lg border border-indigo-100">
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