
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
    // Explicitly define the order of categories as requested in the screenshot
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
    
    return (
        <>
            {/* Modal Drawer Mobile Backdrop */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] lg:hidden"
                    onClick={() => onSelectCategory(selectedCategory)}
                />
            )}

            {/* M3 Navigation Rail / Drawer */}
            <aside className={`
                fixed top-0 bottom-0 left-0 z-[110] w-[280px] lg:w-[88px] bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-white/5
                transform transition-all duration-400 ease-[cubic-bezier(0.4, 0, 0.2, 1)]
                ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                lg:flex lg:flex-col lg:items-center lg:pt-24
            `}>
                <div className="flex flex-col h-full w-full overflow-y-auto lg:overflow-visible py-8 lg:py-0">
                    <div className="px-6 mb-8 lg:hidden">
                        <h2 className="text-sm font-bold text-m3-primary dark:text-indigo-400 tracking-wider uppercase">Explorar</h2>
                    </div>

                    <nav className="flex flex-col space-y-2 lg:space-y-6 w-full items-center">
                        {categories.map(category => {
                            const isSelected = selectedCategory === category;
                            return (
                                <button
                                    key={category}
                                    onClick={() => onSelectCategory(category)}
                                    title={category}
                                    className="relative w-full lg:w-auto flex items-center lg:flex-col group"
                                >
                                    {/* M3 Active Indicator Pill */}
                                    <div className={`
                                        absolute left-0 lg:left-1/2 lg:-translate-x-1/2 h-full lg:h-8 w-1 lg:w-14 rounded-r-full lg:rounded-full transition-all duration-300
                                        ${isSelected ? 'bg-m3-primary opacity-100' : 'bg-transparent opacity-0 group-hover:bg-m3-primary/10 group-hover:opacity-100'}
                                    `} />
                                    
                                    <div className="flex items-center lg:flex-col w-full px-6 lg:px-0 py-3 lg:py-0 relative z-10">
                                        <span className={`
                                            text-2xl transition-transform duration-300
                                            ${isSelected ? 'scale-110' : 'group-hover:scale-110'}
                                        `}>
                                            {categoryIcons[category]}
                                        </span>
                                        <span className={`
                                            ml-4 lg:ml-0 lg:mt-1 text-sm font-medium transition-colors
                                            ${isSelected ? 'text-m3-onSurface dark:text-white font-bold' : 'text-slate-500 dark:text-slate-400 group-hover:text-m3-primary'}
                                            ${isOpen ? 'block' : 'hidden lg:block lg:text-[10px] lg:uppercase lg:tracking-tighter'}
                                        `}>
                                            {category === 'Todos los Productos' ? 'Inicio' : category.split(' ')[0]}
                                        </span>
                                    </div>
                                </button>
                            );
                        })}
                    </nav>
                </div>
            </aside>
        </>
    );
};

export default SideNav;
