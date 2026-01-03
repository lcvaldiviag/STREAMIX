
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

  const shortDescription = isProduct(item) ? item.description : `Incluye: ${item.included.join(', ')}`;

  return (
    <div 
      className={`group relative flex flex-col ${isDarkMode ? 'bg-white/5 backdrop-blur-md border-white/10' : 'bg-white border-slate-200'} rounded-2xl md:rounded-m3-l overflow-hidden border shadow-md transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl cursor-pointer h-full ${isEdu ? 'edu-glow' : ''}`}
      onClick={() => onProductSelect(item)}
    >
      {/* Media Content */}
      <div className={`relative aspect-square w-full overflow-hidden flex items-center justify-center ${isDarkMode ? 'bg-slate-900/40' : 'bg-slate-50'}`}>
        <div 
            className="absolute inset-0 opacity-10 group-hover:opacity-30 transition-opacity duration-700"
            style={{ background: `radial-gradient(circle at center, ${brandColor}, transparent 70%)` }}
        />
        
        {isProduct(item) ? (
            <div className="relative z-10 transition-transform duration-700 group-hover:scale-110">
                <div className={`w-20 h-20 md:w-28 md:h-28 rounded-2xl md:rounded-3xl ${isDarkMode ? 'bg-white/5 backdrop-blur-lg border-white/20' : 'bg-white border-slate-100 shadow-sm'} flex items-center justify-center border shadow-xl`}>
                    <span className="text-4xl md:text-6xl font-black tracking-tighter filter drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]" style={{ color: logoTextColor }}>{item.logo}</span>
                </div>
            </div>
        ) : (
            <img src={item.image} alt={item.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
        )}

        {/* Badges */}
        <div className="absolute top-2 left-2 md:top-4 md:left-4 z-20">
            {isEdu && (
                <span className="px-2 py-0.5 md:px-3 md:py-1 bg-indigo-600 text-white text-[7px] md:text-[9px] font-black rounded-full shadow-lg tracking-widest uppercase animate-pulse">VITALICIO</span>
            )}
        </div>
      </div>

      {/* Info Section */}
      <div className="p-4 md:p-6 flex flex-col items-start text-left relative flex-1 transition-all duration-500">
        <div className="w-full flex justify-between items-start">
            <div className="flex-1 pr-2">
                <h3 className={`text-[13px] md:text-lg font-extrabold transition-colors mb-0.5 tracking-tight line-clamp-1 leading-tight ${isDarkMode ? 'text-white group-hover:text-indigo-400' : 'text-slate-800 group-hover:text-indigo-600'}`}>{item.name}</h3>
                <p className={`text-sm md:text-xl font-black ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>${item.priceUSD.toFixed(2)}</p>
            </div>

            {/* Optimized "+" Button - Positioned next to the price, appearing only on hover */}
            {!isSoldOut && (
              <div className="opacity-0 scale-75 md:opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 transform-gpu flex-shrink-0">
                  <button 
                      onClick={handleAdd}
                      className={`
                        w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full text-white shadow-lg transition-all duration-300
                        bg-indigo-600 dark:bg-indigo-500/80 backdrop-blur-md border border-white/20
                        hover:bg-indigo-500 dark:hover:bg-indigo-400 hover:scale-110 active:scale-90
                        ${isAnimating ? 'ring-4 ring-indigo-400/50 scale-125' : ''}
                      `}
                      title="Añadir al Carrito"
                  >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                      </svg>
                  </button>
              </div>
            )}
        </div>

        {/* Short Description - Expands below price area on hover */}
        <div className="mt-3 overflow-hidden transition-all duration-500 max-h-0 opacity-0 group-hover:max-h-24 group-hover:opacity-100 w-full">
            <p className={`text-[10px] md:text-xs leading-relaxed line-clamp-3 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                {shortDescription}
            </p>
        </div>
      </div>

      {isSoldOut && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-30">
            <span className="bg-white text-black text-[8px] md:text-[10px] font-black px-4 py-1.5 md:px-6 md:py-2 rounded-full shadow-2xl tracking-widest uppercase">AGOTADO</span>
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
    <div className="max-w-7xl mx-auto px-4 md:px-6">
      <header className="mb-6 md:mb-12 text-center flex flex-col items-center">
        <StreamixLogo isDarkMode={isDarkMode} className="w-56 mb-8 md:w-80 md:mb-16" />
        <h1 className={`text-4xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-none mb-4 md:mb-8 transition-colors duration-500 uppercase ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            DIGITAL <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-400">
                EXPERIENCE
            </span>
        </h1>
        <p className={`text-sm md:text-xl font-medium max-w-sm md:max-w-xl leading-relaxed transition-colors duration-500 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
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

      <div className="space-y-16 md:space-y-48 pb-24 md:pb-40">
        {categoriesToRender.map(category => {
          const items = getFilteredItems(category);
          if (items.length === 0) return null;

          return (
            <section key={category} id={category.replace(/\s/g, '-')} className="relative">
              <div className="flex flex-col items-center mb-8 md:mb-20">
                  <span className="text-m3-primary text-[10px] md:text-xs font-black uppercase tracking-[0.3em] mb-3 md:mb-5">EXPLORAR</span>
                  <h2 className={`text-2xl md:text-6xl font-black tracking-tight text-center transition-colors duration-500 uppercase ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                      {category}
                  </h2>
                  <div className="w-16 md:w-32 h-1 bg-gradient-to-r from-m3-primary to-m3-secondary rounded-full mt-4 md:mt-8 shadow-sm"></div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-14">
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
