
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
        <div className="w-full flex justify-center z-50 sticky top-24 md:top-28 pointer-events-none">
            <div className="pointer-events-auto bg-white/80 dark:bg-black/70 backdrop-blur-2xl border border-slate-200 dark:border-white/10 rounded-[2rem] md:rounded-[2.5rem] shadow-2xl p-2 md:p-2 grid grid-cols-4 gap-1 sm:grid-cols-5 md:flex md:items-center md:gap-2 max-w-[95vw] overflow-hidden md:overflow-x-auto no-scrollbar scroll-smooth transition-all duration-500">
                {categories.map(category => {
                    const isSelected = selectedCategory === category;
                    return (
                        <button
                            key={category}
                            onClick={() => {
                                onSelectCategory(category);
                            }}
                            className={`
                                relative flex flex-col items-center group transition-all duration-500 py-2 px-1 md:py-3 md:px-4 rounded-xl md:rounded-[2rem] min-w-0 md:min-w-[80px]
                                ${isSelected ? 'bg-indigo-600/10 dark:bg-white/10' : 'hover:bg-slate-100 dark:hover:bg-white/5'}
                            `}
                        >
                            <div className={`
                                w-9 h-9 md:w-11 md:h-11 rounded-full flex items-center justify-center text-base md:text-xl border transition-all duration-500
                                ${isSelected 
                                    ? 'bg-indigo-600 border-indigo-400 text-white shadow-[0_0_15px_rgba(99,102,241,0.6)]' 
                                    : 'bg-white/5 dark:bg-white/5 border-slate-200 dark:border-white/10 group-hover:border-slate-300 dark:group-hover:border-white/20'
                                }
                            `}>
                                {categoryIcons[category]}
                            </div>
                            <span className={`
                                mt-1 md:mt-2 text-[7px] md:text-[9px] font-black uppercase tracking-widest transition-colors duration-300 whitespace-nowrap overflow-hidden text-ellipsis w-full text-center
                                ${isSelected ? 'text-indigo-600 dark:text-white' : 'text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-200'}
                            `}>
                                {getDisplayName(category)}
                            </span>
                            {isSelected && (
                                <div className="absolute bottom-1 w-1 h-1 bg-indigo-500 rounded-full md:hidden"></div>
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default SideNav;
