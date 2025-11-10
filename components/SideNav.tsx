import React from 'react';
import { Category } from '../types';

interface SideNavProps {
    selectedCategory: Category | 'All Products';
    onSelectCategory: (category: Category | 'All Products') => void;
    isOpen: boolean;
}

const categoryIcons: Record<Category | 'All Products', string> = {
    'All Products': '🌐',
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

const SideNav = ({ selectedCategory, onSelectCategory, isOpen }: SideNavProps) => {
    const categories: (Category | 'All Products')[] = ['All Products', ...Object.values(Category)];
    
    return (
        <aside className={`
            fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200
            transform transition-transform duration-300 ease-in-out
            lg:relative lg:inset-auto lg:z-auto lg:w-56 lg:flex-shrink-0 lg:transform-none
            ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
            <div className="py-8 px-4 lg:pr-8 lg:pl-0 h-full overflow-y-auto">
                <h2 className="text-lg font-semibold text-gray-800 mb-4 px-3">Categories</h2>
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