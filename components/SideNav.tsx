
import React from 'react';
import { Category } from '../types';

interface SideNavProps {
    selectedCategory: Category | 'Todos los Productos';
    onSelectCategory: (category: Category | 'Todos los Productos') => void;
    isOpen: boolean;
    searchQuery: string;
    onSearchChange: (query: string) => void;
}

const categoryIcons: Record<Category | 'Todos los Productos', string> = {
    'Todos los Productos': '🌐',
    [Category.COMBOS]: '✨',
    [Category.STREAMING_SERIES]: '🎬',
    [Category.MUSIC]: '🎵',
    [Category.AI]: '🤖',
    [Category.EDUCATION_LEARNING]: '📚',
    [Category.LIVE_TV_SPORTS]: '📺',
    [Category.GAMING_SUBS]: '🎮',
    [Category.SECURITY]: '🛡️',
    [Category.LIFESTYLE]: '❤️‍🩹',
};

const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-500 dark:text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);

const SideNav = ({ selectedCategory, onSelectCategory, isOpen, searchQuery, onSearchChange }: SideNavProps) => {
    const categories: (Category | 'Todos los Productos')[] = ['Todos los Productos', ...Object.values(Category)];
    
    return (
        <aside className={`
            fixed top-20 bottom-0 left-0 z-[60] w-64 bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-white/10 shadow-2xl
            transform transition-transform duration-300 ease-in-out
            ${isOpen ? 'translate-x-0' : '-translate-x-full'}
            lg:translate-x-0 lg:static lg:h-auto lg:w-60 lg:flex-shrink-0 lg:transform-none lg:bg-transparent lg:border-r lg:border-slate-200/50 dark:lg:border-white/5 lg:shadow-none
        `}>
            {/* In Mobile, ensure background is solid enough to be readable but maintains theme */}
            <div className={`py-8 px-4 lg:pr-6 lg:pl-0 h-full overflow-y-auto custom-scrollbar ${isOpen ? 'bg-white dark:bg-slate-950' : ''}`}>
                <div className="px-2 mb-6 md:hidden">
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2">
                            <SearchIcon />
                        </span>
                        <input
                            type="text"
                            placeholder="Buscar productos..."
                            value={searchQuery}
                            onChange={(e) => onSearchChange(e.target.value)}
                            className="w-full bg-slate-100 dark:bg-slate-900/50 border border-slate-300 dark:border-white/10 rounded-full py-2.5 pl-10 pr-4 text-slate-800 dark:text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent transition-all"
                        />
                    </div>
                </div>
                <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 px-3">Categorías</h2>
                <nav className="space-y-1">
                    {categories.map(category => {
                        const isSelected = selectedCategory === category;
                        return (
                            <button
                                key={category}
                                onClick={() => onSelectCategory(category)}
                                className={`w-full flex items-center space-x-3 px-3 py-2.5 text-left text-sm font-medium rounded-lg transition-all duration-300 group border border-transparent ${
                                    isSelected 
                                    ? 'bg-indigo-50 dark:bg-white/5 text-indigo-700 dark:text-white border-l-4 border-l-indigo-500 shadow-sm dark:shadow-[0_0_15px_rgba(99,102,241,0.15)]' 
                                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-indigo-600 dark:hover:text-slate-200 hover:border-slate-200 dark:hover:border-white/5'
                                }`}
                            >
                                <span className={`text-lg transition-transform duration-300 ${isSelected ? 'scale-110 filter drop-shadow-sm' : 'group-hover:scale-110 group-hover:text-indigo-500 dark:group-hover:text-indigo-400'}`}>
                                    {categoryIcons[category]}
                                </span>
                                <span>{category}</span>
                            </button>
                        );
                    })}
                </nav>
            </div>
        </aside>
    );
};

export default SideNav;
