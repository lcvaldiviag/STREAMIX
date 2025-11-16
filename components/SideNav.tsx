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
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);

const SideNav = ({ selectedCategory, onSelectCategory, isOpen, searchQuery, onSearchChange }: SideNavProps) => {
    const categories: (Category | 'Todos los Productos')[] = ['Todos los Productos', ...Object.values(Category)];
    
    return (
        <aside className={`
            fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200
            transform transition-transform duration-300 ease-in-out
            lg:relative lg:inset-auto lg:z-auto lg:w-56 lg:flex-shrink-0 lg:transform-none
            ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
            <div className="py-8 px-4 lg:pr-8 lg:pl-0 h-full overflow-y-auto">
                <div className="px-3 mb-4 md:hidden">
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2">
                            <SearchIcon />
                        </span>
                        <input
                            type="text"
                            placeholder="Buscar productos..."
                            value={searchQuery}
                            onChange={(e) => onSearchChange(e.target.value)}
                            className="w-full bg-slate-100 border border-slate-200 rounded-full py-2 pl-10 pr-4 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                </div>
                <h2 className="text-lg font-semibold text-gray-800 mb-4 px-3">Categorías</h2>
                <nav className="space-y-2">
                    {categories.map(category => {
                        const isSelected = selectedCategory === category;
                        return (
                            <button
                                key={category}
                                onClick={() => onSelectCategory(category)}
                                className={`w-full flex items-center space-x-3 px-3 py-2.5 text-left text-sm font-medium rounded-lg transition-colors duration-200 ${
                                    isSelected 
                                    ? 'bg-indigo-600 text-white shadow' 
                                    : 'text-gray-600 hover:bg-slate-100 hover:text-gray-900'
                                }`}
                            >
                                <span>{categoryIcons[category]}</span>
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