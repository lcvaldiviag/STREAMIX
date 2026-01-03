
import React, { useState } from 'react';
import { Product, Combo, Category } from '../types';
import { PRODUCTS, COMBOS } from '../constants';
import { StreamixLogo } from './Header';

interface CardProps {
  item: Product | Combo;
  onAddToCart: (item: Product | Combo) => void;
  onProductSelect: (item: Product | Combo) => void;
}

const isProduct = (item: Product | Combo): item is Product => 'logo' in item;

const Card: React.FC<CardProps> = ({ item, onAddToCart, onProductSelect }) => {
  const brandColor = isProduct(item) ? item.brandColor : '#4F46E5';
  const isSoldOut = isProduct(item) ? item.soldOut : false;
  const isEdu = isProduct(item) && item.category === Category.STREAMIX_EDU;
  const hasFreeLicense = item.name.includes('LICENCIA GRATIS');
  
  const [isHovered, setIsHovered] = useState(false);

  // Optimization: In dark mode, if the brand color is too dark (like black), we use white for the logo text
  const logoTextColor = (isProduct(item) && item.brandColor === '#000000') ? '#FFFFFF' : brandColor;

  return (
    <div 
      className="group relative flex flex-col bg-white dark:bg-slate-900 rounded-m3-l overflow-hidden border border-slate-200 dark:border-white/5 shadow-sm hover:shadow-xl transition-all duration-400 ease-out cursor-pointer h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onProductSelect(item)}
    >
      {/* M3 Content Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 dark:bg-slate-800 flex items-center justify-center p-6">
        {/* Dynamic Background Glow */}
        <div 
            className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity"
            style={{ background: `radial-gradient(circle at center, ${brandColor}, transparent)` }}
        />
        
        {isProduct(item) ? (
            <div className="relative z-10 transition-transform duration-500 group-hover:scale-110">
                <div className="w-20 h-20 rounded-2xl bg-white dark:bg-slate-950 flex items-center justify-center shadow-xl border border-slate-100 dark:border-white/5">
                    <span className="text-4xl font-black tracking-tighter" style={{ color: logoTextColor }}>{item.logo}</span>
                </div>
            </div>
        ) : (
            <img src={item.image} alt={item.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
        )}

        {/* Action Button - Reveal on Hover / Persistent on Mobile */}
        <div className={`absolute bottom-3 right-3 transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 lg:opacity-0'}`}>
            <button 
                onClick={(e) => { e.stopPropagation(); onAddToCart(item); }}
                className="p-3 bg-m3-primary text-white rounded-full shadow-lg hover:bg-indigo-700 active:scale-90 transition-all"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                </svg>
            </button>
        </div>

        {/* Gift Overlay for Courses with Free License */}
        {isEdu && hasFreeLicense && (
            <div className="absolute top-3 right-3 z-30 flex flex-col items-center pointer-events-none">
                <span className="text-3xl animate-bounce drop-shadow-md">🎁</span>
                <span className="bg-[#4F46E5] text-white text-[8px] font-black px-2 py-0.5 rounded shadow-sm uppercase tracking-tighter -mt-1 border border-white/20 whitespace-nowrap">
                    + LICENCIA DE REGALO
                </span>
            </div>
        )}
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
            <h3 className="text-[17px] font-extrabold text-slate-900 dark:text-white line-clamp-1 leading-tight tracking-tight">{item.name}</h3>
            {isProduct(item) && item.specialOffer && (
                <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-[10px] font-bold px-2 py-0.5 rounded-full">OFERTA</span>
            )}
        </div>

        <div className="mt-auto flex items-end justify-between">
            <div className="flex flex-col">
                <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400">${item.priceUSD.toFixed(2)}</span>
                <span className="text-[12px] font-bold text-slate-500/80 dark:text-slate-400/80 uppercase tracking-widest">{item.priceBS.toFixed(0)} Bs.</span>
            </div>
            
            <div className="text-[11px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-tighter opacity-70 group-hover:opacity-100 transition-opacity">
                {isProduct(item) ? item.category.split(' ')[0] : 'Combo'}
            </div>
        </div>
      </div>

      {isSoldOut && (
        <div className="absolute inset-0 bg-white/60 dark:bg-slate-950/60 backdrop-blur-[1px] flex items-center justify-center z-20">
            <span className="bg-slate-900 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-xl">AGOTADO</span>
        </div>
      )}
    </div>
  );
};

interface ProductListProps {
  onAddToCart: (item: Product | Combo) => void;
  onProductSelect: (item: Product | Combo) => void;
  selectedCategory: Category | 'Todos los Productos';
  searchQuery: string;
  isDarkMode: boolean;
}

const ProductList = ({ onAddToCart, onProductSelect, selectedCategory, searchQuery, isDarkMode }: ProductListProps) => {
  const allCategories = Object.values(Category);
  
  const getFilteredItems = (category: Category) => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    let items: (Product | Combo)[] = category === Category.COMBOS ? COMBOS : PRODUCTS.filter(p => p.category === category);
    return searchQuery ? items.filter(item => item.name.toLowerCase().includes(lowerCaseQuery)) : items;
  };
  
  const categoriesToRender = selectedCategory === 'Todos los Productos' ? allCategories : [selectedCategory];

  return (
    <div className="max-w-screen-xl mx-auto px-4">
      <header className="mb-14">
        {/* Streamix Logo added above the heading to fix the missing logo issue */}
        <StreamixLogo isDarkMode={isDarkMode} className="w-56 mb-10 lg:w-72" />
        
        {/* Fixed "leading-none" to "leading-[1.1]" and reduced "tracking-tighter" to "tracking-tight" to prevent descenders like 'p' from being cut */}
        <h1 className="text-5xl lg:text-7xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.1] mb-6">
            Digital <span className="text-transparent bg-clip-text bg-gradient-to-r from-m3-primary to-m3-secondary pr-1">Shop</span>
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-xl font-medium max-w-2xl leading-relaxed">
            Soluciones premium de streaming e inteligencia artificial para potenciar tu entretenimiento y productividad.
        </p>
      </header>

      <div className="space-y-20 pb-24">
        {categoriesToRender.map(category => {
          const items = getFilteredItems(category);
          if (items.length === 0) return null;

          return (
            <section key={category} id={category.replace(/\s/g, '-')} className="animate-in fade-in slide-in-from-bottom-4 duration-700">
               <div className="flex items-center justify-between mb-10">
                    <h2 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight flex items-center gap-4">
                        <span className="w-2 h-8 bg-m3-primary rounded-full shadow-[0_0_15px_rgba(79,70,229,0.3)]"></span>
                        {category}
                        {category === Category.STREAMIX_EDU && (
                          <span className="ml-3 px-3 py-1 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 text-[11px] font-black rounded-full animate-pulse border border-indigo-200 dark:border-indigo-800/50 uppercase tracking-tighter shadow-sm">
                            ¡NUEVO!
                          </span>
                        )}
                    </h2>
                </div>
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
                {items.map(item => (
                  <Card key={item.id} item={item} onAddToCart={onAddToCart} onProductSelect={onProductSelect} />
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
