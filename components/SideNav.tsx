
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
    [Category.STREAMING_SERIES]: '🎬',
    [Category.STREAMIX_EDU]: '🎓',
    [Category.COMBOS]: '✨',
    [Category.MUSIC]: '🎵',
    [Category.AI]: '🤖',
    [Category.EDUCATION_LEARNING]: '📚',
    [Category.LIVE_TV_SPORTS]: '📺',
    [Category.GAMING_SUBS]: '🎮',
    [Category.SECURITY]: '🛡️',
    [Category.LIFESTYLE]: '❤️‍🩹',
};

const SideNav = ({ selectedCategory, onSelectCategory, isOpen, searchQuery, onSearchChange }: SideNavProps) => {
    const categories: (Category | 'Todos los Productos')[] = [
        'Todos los Productos',
        Category.STREAMING_SERIES,
        Category.STREAMIX_EDU,
        Category.COMBOS,
        Category.MUSIC,
        Category.EDUCATION_LEARNING,
        Category.AI,
        Category.SECURITY,
        Category.GAMING_SUBS,
        Category.LIVE_TV_SPORTS,
        Category.LIFESTYLE,
    ];

    const getDisplayName = (cat: string) => {
        if (cat === 'Todos los Productos') return 'INICIO';
        if (cat === Category.STREAMING_SERIES) return 'STREAMING';
        if (cat === Category.STREAMIX_EDU) return 'CURSOS';
        if (cat === Category.COMBOS) return 'COMBOS';
        if (cat === Category.MUSIC) return 'MÚSICA';
        if (cat === Category.EDUCATION_LEARNING) return 'EDUCACIÓN';
        if (cat === Category.AI) return 'INTELIGENCIA';
        if (cat === Category.SECURITY) return 'SEGURIDAD';
        if (cat === Category.GAMING_SUBS) return 'GAMING';
        if (cat === Category.LIVE_TV_SPORTS) return 'TV';
        if (cat === Category.LIFESTYLE) return 'ESTILO';
        return cat.split(' ')[0].toUpperCase();
    };
    
    return (
        <div className="w-full py-4 md:py-6 mt-2 md:mt-4">
            <div className="max-w-7xl mx-auto px-2">
                <nav className="grid grid-cols-4 sm:grid-cols-5 md:flex md:items-center gap-2 md:gap-5 justify-start md:justify-center px-2">
                    {categories.map(category => {
                        const isSelected = selectedCategory === category;
                        return (
                            <button
                                key={category}
                                onClick={() => onSelectCategory(category)}
                                className={`
                                    flex flex-col items-center group transition-all duration-300 py-2 rounded-2xl
                                    ${isSelected ? 'bg-indigo-600/10 scale-105' : 'hover:scale-105'}
                                `}
                            >
                                <div className={`
                                    w-10 h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center text-xl lg:text-2xl border transition-all duration-300 shadow-sm
                                    ${isSelected 
                                        ? 'bg-indigo-600/30 border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.5)]' 
                                        : 'bg-white/5 border-white/10 hover:bg-white/10 group-hover:border-white/20'
                                    }
                                `}>
                                    {categoryIcons[category]}
                                </div>
                                <span className={`
                                    mt-1 text-[8px] lg:text-[10px] font-black uppercase tracking-tight transition-colors duration-300 whitespace-nowrap overflow-hidden text-ellipsis w-full px-1 text-center
                                    ${isSelected ? 'text-indigo-500 dark:text-white' : 'text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300'}
                                `}>
                                    {getDisplayName(category)}
                                </span>
                                
                                <div className={`
                                    h-0.5 rounded-full mt-1 transition-all duration-500 hidden md:block
                                    ${isSelected ? 'w-6 bg-indigo-500 opacity-100' : 'w-0 bg-transparent opacity-0 group-hover:w-3 group-hover:bg-indigo-500/50 group-hover:opacity-50'}
                                `} />
                            </button>
                        );
                    })}
                </nav>
            </div>
        </div>
    );
};

export default SideNav;
