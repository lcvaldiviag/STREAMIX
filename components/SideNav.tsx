import React from 'react';
import { Category } from '../types';

const allCategoriesInOrder = [
    Category.COMBOS,
    Category.STREAMING_SERIES,
    Category.MUSIC,
    Category.AI,
    Category.EDUCATION_LEARNING,
    Category.LIVE_TV_SPORTS,
    Category.GAMING_SUBS,
    Category.SECURITY,
    Category.LIFESTYLE,
];


const IconMap: { [key in Category]?: string } = {
  [Category.STREAMING_SERIES]: '🎬',
  [Category.COMBOS]: '✨',
  [Category.MUSIC]: '🎵',
  [Category.EDUCATION_LEARNING]: '📚',
  [Category.AI]: '🤖',
  [Category.SECURITY]: '🛡️',
  [Category.GAMING_SUBS]: '🎮',
  [Category.LIVE_TV_SPORTS]: '📺',
  [Category.LIFESTYLE]: '❤️‍🔥',
};

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);


interface SideNavProps {
    selectedCategory: string;
    onSelectCategory: (category: string) => void;
    isOpen: boolean;
    onClose: () => void;
}

const SideNav = ({ selectedCategory, onSelectCategory, isOpen, onClose }: SideNavProps) => {

    const navContent = (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-6 text-white tracking-wide px-4">Categories</h2>
            <nav className="space-y-2">
                 <button
                    onClick={() => onSelectCategory('All')}
                    className={`w-full text-left flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                        selectedCategory === 'All'
                            ? 'bg-[#3A86FF] text-white shadow-lg shadow-blue-500/30'
                            : 'text-gray-300 hover:bg-white/10 hover:text-white'
                    }`}
                >
                    <span className="text-xl">🌐</span>
                    <span className="font-semibold">All Products</span>
                </button>
                {allCategoriesInOrder.map(category => (
                    <button
                        key={category}
                        onClick={() => onSelectCategory(category)}
                        className={`w-full text-left flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                            selectedCategory === category
                                ? 'bg-[#3A86FF] text-white shadow-lg shadow-blue-500/30'
                                : 'text-gray-300 hover:bg-white/10 hover:text-white'
                        }`}
                    >
                         <span className="text-xl">{IconMap[category] || '📁'}</span>
                        <span className="font-semibold">{category}</span>
                    </button>
                ))}
            </nav>
        </div>
    );
    
    return (
        <>
            {/* Mobile Nav Overlay */}
            <div 
                className={`fixed inset-0 bg-black/60 z-40 lg:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
            ></div>
            {/* Mobile Nav Panel */}
            <aside className={`fixed top-0 left-0 h-full w-64 bg-[#1A1A2E] shadow-2xl z-50 transform transition-transform duration-300 lg:hidden ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                 <div className="flex justify-end p-2 absolute top-2 right-2">
                    <button onClick={onClose} className="p-2 text-gray-300 hover:text-white">
                        <CloseIcon />
                    </button>
                </div>
                <div className="mt-12">
                 {navContent}
                </div>
            </aside>

            {/* Desktop Nav */}
            <aside className="hidden lg:block w-64 flex-shrink-0 sticky top-20 h-[calc(100vh-5rem)]">
                {navContent}
            </aside>
        </>
    );
};

export default SideNav;