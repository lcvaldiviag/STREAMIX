import React from 'react';
import { Category } from '../types';

interface SideNavProps {
    selectedCategory: Category | 'All Products';
    onSelectCategory: (category: Category | 'All Products') => void;
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

const SideNav = ({ selectedCategory, onSelectCategory }: SideNavProps) => {
    // Fix: Explicitly type `categories` to ensure correct type inference within the map function.
    const categories: (Category | 'All Products')[] = ['All Products', ...Object.values(Category)];
    
    return (
        <aside className="w-56 flex-shrink-0 py-8 pr-8 border-r border-gray-200">
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
        </aside>
    );
};

export default SideNav;