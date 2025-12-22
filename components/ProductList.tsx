
import React, { useState } from 'react';
import { Product, Combo, Category } from '../types';
import { PRODUCTS, COMBOS } from '../constants';

interface CardProps {
  item: Product | Combo;
  onAddToCart: (item: Product | Combo) => void;
  onProductSelect: (item: Product | Combo) => void;
}

const isProduct = (item: Product | Combo): item is Product => 'logo' in item;

const Card: React.FC<CardProps> = ({ item, onAddToCart, onProductSelect }) => {
  const brandColor = isProduct(item) ? item.brandColor : '#4F46E5';
  const isSoldOut = isProduct(item) ? item.soldOut : false;
  
  const [isHovered, setIsHovered] = useState(false);

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
                    <span className="text-4xl font-black tracking-tighter" style={{ color: brandColor }}>{item.logo}</span>
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
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
            <h3 className="text-base font-bold text-slate-900 dark:text-white line-clamp-1 leading-tight">{item.name}</h3>
            {isProduct(item) && item.specialOffer && (
                <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-[10px] font-bold px-2 py-0.5 rounded-full">OFERTA</span>
            )}
        </div>

        <div className="mt-auto flex items-end justify-between">
            <div className="flex flex-col">
                <span className="text-xl font-black text-indigo-600 dark:text-indigo-400">${item.priceUSD.toFixed(2)}</span>
                <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">{item.priceBS.toFixed(0)} Bs.</span>
            </div>
            
            <div className="text-[10px] font-bold text-slate-400 dark:text-slate-600 uppercase">
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
}

const ProductList = ({ onAddToCart, onProductSelect, selectedCategory, searchQuery }: ProductListProps) => {
  const allCategories = Object.values(Category);
  
  const getFilteredItems = (category: Category) => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    let items: (Product | Combo)[] = category === Category.COMBOS ? COMBOS : PRODUCTS.filter(p => p.category === category);
    return searchQuery ? items.filter(item => item.name.toLowerCase().includes(lowerCaseQuery)) : items;
  };
  
  const categoriesToRender = selectedCategory === 'Todos los Productos' ? allCategories : [selectedCategory];

  return (
    <div className="max-w-screen-xl mx-auto px-4">
      <header className="mb-12">
        <h1 className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-none mb-4">
            Digital <span className="text-transparent bg-clip-text bg-gradient-to-r from-m3-primary to-m3-secondary">SHOP</span>
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-lg font-medium max-w-2xl">
            Soluciones premium de streaming e inteligencia artificial para potenciar tu entretenimiento y productividad.
        </p>
      </header>

      <div className="space-y-16 pb-24">
        {categoriesToRender.map(category => {
          const items = getFilteredItems(category);
          if (items.length === 0) return null;

          return (
            <section key={category} id={category.replace(/\s/g, '-')} className="animate-in fade-in slide-in-from-bottom-4 duration-700">
               <div className="flex items-center justify-between mb-8">
                    <h2 className="text-xl font-bold text-slate-800 dark:text-white tracking-tight flex items-center gap-3">
                        <span className="w-1.5 h-6 bg-m3-primary rounded-full"></span>
                        {category}
                    </h2>
                </div>
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
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
