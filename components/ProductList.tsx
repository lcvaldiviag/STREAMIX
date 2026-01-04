
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

// Definición de imágenes contextuales de alta calidad
const CONTEXT_IMAGES: Record<string, string> = {
    HERO: "https://images.unsplash.com/photo-1593784991095-a205039470b6?q=80&w=2070&auto=format&fit=crop",
    [Category.STREAMING_SERIES]: "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?q=80&w=1470&auto=format&fit=crop",
    [Category.STREAMIX_EDU]: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1374&auto=format&fit=crop",
    [Category.AI]: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1632&auto=format&fit=crop",
    DIVIDER: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
};

const Card: React.FC<CardProps> = ({ item, onAddToCart, onProductSelect, isDarkMode }) => {
  const brandColor = isProduct(item) ? item.brandColor : (isDarkMode ? '#ffffff' : '#000000');
  const isSoldOut = isProduct(item) ? item.soldOut : false;
  const [ghosts, setGhosts] = useState<{ id: number; x: number; y: number }[]>([]);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSoldOut) return;

    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const ghostId = Date.now();
    setGhosts(prev => [...prev, { id: ghostId, x: e.clientX, y: e.clientY }]);
    setTimeout(() => setGhosts(prev => prev.filter(g => g.id !== ghostId)), 800);

    onAddToCart(item);
  };

  const displayColor = isProduct(item) ? (item.brandColor === '#000000' ? (isDarkMode ? '#ffffff' : '#000000') : item.brandColor) : (isDarkMode ? '#ffffff' : '#000000');

  return (
    <div className="product-card group" onClick={() => onProductSelect(item)}>
      {ghosts.map(ghost => (
        <div 
          key={ghost.id} 
          className="ghost-particle" 
          style={{ top: '50%', left: '50%' }}
        />
      ))}

      <div className="product-image-container">
        <div className="content-wrapper">
          {isProduct(item) ? (
            <span 
              className="logo-text text-5xl md:text-7xl font-black tracking-tighter" 
              style={{ color: displayColor }}
            >
              {item.logo}
            </span>
          ) : (
            <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-110" />
          )}
        </div>
        
        {isProduct(item) && item.category === Category.STREAMIX_EDU && (
          <div className="absolute top-2 left-2 md:top-4 md:left-4 bg-indigo-600 text-white text-[7px] md:text-[9px] font-black px-2 md:px-3 py-0.5 md:py-1 rounded-full tracking-widest uppercase shadow-lg">
            VITALICIO
          </div>
        )}
      </div>

      <div className="p-3 md:p-6 flex flex-col flex-grow">
        <div className="mb-2 md:mb-4">
          <h3 className="text-luxury-text text-sm md:text-lg font-bold leading-tight tracking-tight mb-1">
            {item.name}
          </h3>
          <div className="flex flex-col md:flex-row md:items-baseline gap-0.5 md:gap-2">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-lg md:text-2xl font-black">
                ${item.priceUSD.toFixed(2)}
            </span>
            <span className="text-luxury-muted text-[10px] md:text-xs font-bold uppercase tracking-wider">/ {item.priceBS.toFixed(0)} Bs.</span>
          </div>
        </div>

        <p className="text-luxury-muted text-[11px] md:text-xs leading-relaxed line-clamp-2 md:line-clamp-3 mb-4 flex-grow min-h-[32px] md:min-h-[48px]">
          {isProduct(item) ? item.description : `Incluye: ${item.included.join(', ')}`}
        </p>

        {!isSoldOut && (
          <button className="add-btn mt-auto" onClick={handleAdd}>
            Añadir
          </button>
        )}
      </div>

      {isSoldOut && (
        <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px] flex items-center justify-center z-20">
          <span className="border border-white/50 text-white text-[9px] md:text-[10px] font-black px-4 md:px-6 py-1 md:py-2 tracking-widest uppercase">
            Agotado
          </span>
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
      <header className="mb-4 md:mb-8 text-center flex flex-col items-center">
        <StreamixLogo isDarkMode={isDarkMode} className="w-48 md:w-64 mb-6 md:mb-8" />
        
        {/* Banner Superior Hero - Optimized visual area */}
        <div className="hero-banner-main">
            <img src={CONTEXT_IMAGES.HERO} alt="" className="opacity-80 dark:opacity-60" />
            <div className="hero-overlay"></div>
            <div className="relative z-10 px-6 md:px-16 text-left max-w-4xl py-12 md:py-20">
                <h2 className="text-luxury-pure text-4xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85] mb-6">
                    DISFRUTA EL <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">SIGUIENTE NIVEL</span>
                </h2>
                <p className="text-luxury-text text-opacity-100 dark:text-luxury-text text-sm md:text-xl font-medium leading-relaxed max-w-xl mb-10">
                    La mayor colección de entretenimiento digital y formación profesional de Latinoamérica en un solo lugar.
                </p>
                <button 
                  onClick={() => document.getElementById('Streaming-y-Series')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-10 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-black uppercase tracking-[0.2em] text-[11px] rounded-full hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-indigo-500/50"
                >
                  Explorar Catálogo
                </button>
            </div>
        </div>
      </header>

      <SideNav 
        selectedCategory={selectedCategory}
        onSelectCategory={onSelectCategory}
        isOpen={isNavOpen}
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
      />

      <div className="space-y-24 md:space-y-48 pb-24 md:pb-40 mt-12 md:mt-24">
        {categoriesToRender.map((category, index) => {
          const items = getFilteredItems(category);
          if (items.length === 0) return null;

          return (
            <React.Fragment key={category}>
                {/* Visual Divider - Adición Visual entre categorías principales */}
                {index > 0 && index % 2 === 0 && (
                    <div className="visual-divider" style={{ backgroundImage: `url(${CONTEXT_IMAGES.DIVIDER})` }}></div>
                )}

                <section id={category.replace(/\s/g, '-')} className="relative pt-8">
                  {/* Category Banner - Adición Visual Contextual */}
                  {CONTEXT_IMAGES[category] && (
                      <div className="category-banner group">
                          <img src={CONTEXT_IMAGES[category]} alt={category} />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                          <div className="category-banner-text">
                              <span className="text-[10px] font-black tracking-[0.4em] text-white/60 uppercase block mb-1">COLECCIÓN PREMIUM</span>
                              <h3 className="text-3xl md:text-5xl font-black uppercase text-white tracking-tighter">{category}</h3>
                          </div>
                      </div>
                  )}

                  <div className="flex flex-col items-center mb-8 md:mb-16">
                      <span className="text-indigo-500 text-[9px] md:text-[10px] font-black uppercase tracking-[0.5em] mb-2 md:mb-4">COLECCIÓN</span>
                      <h2 className={`text-2xl md:text-5xl font-black tracking-tight text-center uppercase transition-colors duration-500 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                          {category}
                      </h2>
                      <div className={`w-16 md:w-24 h-0.5 md:h-1 mt-4 md:mt-6 rounded-full transition-opacity duration-500 ${isDarkMode ? 'bg-white opacity-10' : 'bg-slate-900 opacity-5'}`}></div>
                  </div>

                  <div className="product-grid">
                    {items.map(item => (
                      <Card key={item.id} item={item} onAddToCart={onAddToCart} onProductSelect={onProductSelect} isDarkMode={isDarkMode} />
                    ))}
                  </div>
                </section>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default ProductList;
