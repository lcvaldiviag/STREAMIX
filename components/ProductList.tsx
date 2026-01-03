
import React, { useState } from 'react';
import { Product, Combo, Category } from '../types';
import { PRODUCTS, COMBOS } from '../constants';
import { StreamixLogo } from './Header';
import SideNav from './SideNav';

interface CardProps {
  item: Product | Combo;
  onAddToCart: (item: Product | Combo) => void;
  onProductSelect: (item: Product | Combo) => void;
  isDarkMode: boolean;
}

const isProduct = (item: Product | Combo): item is Product => 'logo' in item;

const Card: React.FC<CardProps> = ({ item, onAddToCart, onProductSelect, isDarkMode }) => {
  const brandColor = isProduct(item) ? item.brandColor : '#6366F1';
  const isSoldOut = isProduct(item) ? item.soldOut : false;
  const isEdu = isProduct(item) && item.category === Category.STREAMIX_EDU;
  const [isAnimating, setIsAnimating] = useState(false);
  
  const logoTextColor = (isProduct(item) && item.brandColor === '#000000') ? (isDarkMode ? '#FFFFFF' : '#1e293b') : brandColor;

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAnimating(true);
    onAddToCart(item);
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <div 
      className={`group relative flex flex-col ${isDarkMode ? 'bg-white/5 backdrop-blur-md border-white/10' : 'bg-white border-slate-200'} rounded-m3-l overflow-hidden border shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] cursor-pointer h-full ${isEdu ? 'edu-glow' : ''}`}
      onClick={() => onProductSelect(item)}
    >
      {/* Media Content */}
      <div className={`relative aspect-square w-full overflow-hidden flex items-center justify-center ${isDarkMode ? 'bg-slate-900/40' : 'bg-slate-50'}`}>
        <div 
            className="absolute inset-0 opacity-10 group-hover:opacity-30 transition-opacity duration-700"
            style={{ background: `radial-gradient(circle at center, ${brandColor}, transparent 70%)` }}
        />
        
        {isProduct(item) ? (
            <div className="relative z-10 transition-transform duration-700 group-hover:scale-105">
                <div className={`w-24 h-24 rounded-3xl ${isDarkMode ? 'bg-white/5 backdrop-blur-lg border-white/20' : 'bg-white border-slate-100 shadow-sm'} flex items-center justify-center border shadow-2xl`}>
                    <span className="text-5xl font-black tracking-tighter filter drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]" style={{ color: logoTextColor }}>{item.logo}</span>
                </div>
            </div>
        ) : (
            <img src={item.image} alt={item.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
        )}

        {/* Hover Action Reveal - Perfect Circle "+" Button (Glassmorphism) */}
        {!isSoldOut && (
          <div className="absolute bottom-4 right-4 z-30 opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 transform-gpu">
              <button 
                  onClick={handleAdd}
                  className={`
                    w-12 h-12 flex items-center justify-center rounded-full text-white shadow-2xl transition-all duration-300
                    bg-white/20 dark:bg-white/10 backdrop-blur-md border border-white/40
                    hover:bg-indigo-600 dark:hover:bg-indigo-500 hover:scale-110 active:scale-90
                    ${isAnimating ? 'ring-4 ring-indigo-400/50 scale-125' : ''}
                  `}
                  title="Añadir al Carrito"
              >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                  </svg>
              </button>
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-4 left-4 z-20">
            {isEdu && (
                <span className="px-3 py-1 bg-indigo-600 text-white text-[9px] font-black rounded-full shadow-lg tracking-widest uppercase animate-pulse">VITALICIO</span>
            )}
        </div>
      </div>

      {/* Info Section - High Readability */}
      <div className="p-6 flex flex-col items-start text-left">
        <h3 className={`text-lg font-extrabold transition-colors mb-0.5 tracking-tight ${isDarkMode ? 'text-white group-hover:text-indigo-400' : 'text-slate-800 group-hover:text-indigo-600'}`}>{item.name}</h3>
        <p className={`text-xl font-black ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>${item.priceUSD.toFixed(2)}</p>
      </div>

      {isSoldOut && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-30">
            <span className="bg-white text-black text-[10px] font-black px-6 py-2 rounded-full shadow-2xl tracking-widest uppercase">AGOTADO</span>
        </div>
      )}
    </div>
  );
};

interface ProductListProps {
  onAddToCart: (item: Product | Combo) => void;
  onProductSelect: (item: Product | Combo) => void;
  selectedCategory: Category | 'Todos los Productos';
  onSelectCategory: (category: Category | 'Todos los Productos') => void;
  searchQuery: string;
  isDarkMode: boolean;
  isNavOpen: boolean;
  onSearchChange: (query: string) => void;
}

const ProductList = ({ onAddToCart, onProductSelect, selectedCategory, onSelectCategory, searchQuery, isDarkMode, isNavOpen, onSearchChange }: ProductListProps) => {
  const allCategories = Object.values(Category);
  
  const getFilteredItems = (category: Category) => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    let items: (Product | Combo)[] = category === Category.COMBOS ? COMBOS : PRODUCTS.filter(p => p.category === category);
    return searchQuery ? items.filter(item => item.name.toLowerCase().includes(lowerCaseQuery)) : items;
  };
  
  const categoriesToRender = selectedCategory === 'Todos los Productos' ? allCategories : [selectedCategory];

  return (
    <div className="max-w-7xl mx-auto px-6">
      <header className="mb-8 text-center flex flex-col items-center">
        <StreamixLogo isDarkMode={isDarkMode} className="w-64 mb-12 lg:w-80" />
        <h1 className={`text-6xl lg:text-9xl font-black tracking-tighter leading-none mb-6 transition-colors duration-500 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            DIGITAL <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-400">
                EXPERIENCE
            </span>
        </h1>
        <p className={`text-xl font-medium max-w-xl leading-relaxed transition-colors duration-500 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Suscripciones premium y formación vitalicia. Tu acceso directo al mundo digital.
        </p>
      </header>

      <SideNav 
        selectedCategory={selectedCategory}
        onSelectCategory={onSelectCategory}
        isOpen={isNavOpen}
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
      />

      <div className="space-y-48 pb-32">
        {categoriesToRender.map(category => {
          const items = getFilteredItems(category);
          if (items.length === 0) return null;

          return (
            <section key={category} id={category.replace(/\s/g, '-')} className="relative">
              <div className="flex flex-col items-center mb-16">
                  <span className="text-m3-primary text-xs font-black uppercase tracking-[0.3em] mb-4">EXPLORAR</span>
                  <h2 className={`text-4xl lg:text-6xl font-black tracking-tight text-center transition-colors duration-500 uppercase ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                      {category}
                  </h2>
                  <div className="w-24 h-1 bg-gradient-to-r from-m3-primary to-m3-secondary rounded-full mt-6 shadow-sm"></div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
                {items.map(item => (
                  <Card key={item.id} item={item} onAddToCart={onAddToCart} onProductSelect={onProductSelect} isDarkMode={isDarkMode} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};

export default ProductList;
