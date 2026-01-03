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
  const brandColor = isProduct(item) ? item.brandColor : '#ffffff';
  const isSoldOut = isProduct(item) ? item.soldOut : false;
  const [ghosts, setGhosts] = useState<{ id: number }[]>([]);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSoldOut) return;

    const ghostId = Date.now();
    setGhosts(prev => [...prev, { id: ghostId }]);
    setTimeout(() => setGhosts(prev => prev.filter(g => g.id !== ghostId)), 800);

    onAddToCart(item);
  };

  return (
    <div className="product-card" onClick={() => onProductSelect(item)}>
      {/* Partículas Ghost */}
      {ghosts.map(ghost => (
        <div 
          key={ghost.id} 
          className="ghost-particle" 
          style={{ top: '50%', left: '50%', background: brandColor }}
        />
      ))}

      {/* Contenedor de Imagen de Lujo */}
      <div className="product-image-container">
        <div className="content-wrapper">
          {isProduct(item) ? (
            <span 
              className="text-4xl md:text-7xl font-black tracking-tighter" 
              style={{ color: item.brandColor === '#000000' ? '#ffffff' : item.brandColor }}
            >
              {item.logo}
            </span>
          ) : (
            <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-xl" />
          )}
        </div>
        
        {isProduct(item) && item.category === Category.STREAMIX_EDU && (
          <div className="absolute top-2 left-2 md:top-4 md:left-4 bg-indigo-600 text-white text-[7px] md:text-[9px] font-black px-2 md:px-3 py-0.5 md:py-1 rounded-full tracking-widest uppercase shadow-lg">
            VITALICIO
          </div>
        )}
      </div>

      {/* Información Blindada */}
      <div className="p-3 md:p-6 flex flex-col flex-grow">
        <div className="mb-2 md:mb-4">
          <h3 className="text-luxury-text text-sm md:text-lg font-bold leading-tight tracking-tight mb-1 truncate">
            {item.name}
          </h3>
          <div className="flex flex-col md:flex-row md:items-baseline gap-0.5 md:gap-2">
            <span className="text-white text-lg md:text-2xl font-black">${item.priceUSD.toFixed(2)}</span>
            <span className="text-slate-500 text-[9px] md:text-xs font-bold uppercase tracking-wider">/ {item.priceBS.toFixed(0)} Bs.</span>
          </div>
        </div>

        <p className="text-slate-500 text-[10px] md:text-xs leading-relaxed line-clamp-2 mb-3 md:mb-6 h-6 md:h-8">
          {isProduct(item) ? item.description : `Incluye: ${item.included.join(', ')}`}
        </p>

        {!isSoldOut && (
          <button className="add-btn" onClick={handleAdd}>
            Añadir
          </button>
        )}
      </div>

      {isSoldOut && (
        <div className="absolute inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-20">
          <span className="border border-white text-white text-[8px] md:text-[10px] font-black px-4 md:px-6 py-1 md:py-2 tracking-[0.2em] md:tracking-[0.3em] uppercase">
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
      <header className="mb-10 md:mb-20 text-center flex flex-col items-center">
        <StreamixLogo isDarkMode={isDarkMode} className="w-48 md:w-64 mb-8 md:mb-16" />
        <h1 className="text-4xl md:text-8xl font-black tracking-tighter leading-none mb-4 md:mb-6 uppercase text-white">
          DIGITAL <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-400" style={{ WebkitBackgroundClip: 'text', backgroundClip: 'text' }}>
            EXPERIENCE
          </span>
        </h1>
        <p className="text-slate-500 text-sm md:text-xl font-medium max-w-2xl leading-relaxed">
          Suscripciones premium y formación vitalicia. Tu acceso directo al mundo digital de alta gama.
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
              <div className="flex flex-col items-center mb-8 md:mb-16">
                  <span className="text-indigo-500 text-[8px] md:text-[10px] font-black uppercase tracking-[0.5em] mb-2 md:mb-4">COLECCIÓN</span>
                  <h2 className="text-2xl md:text-5xl font-black tracking-tight text-center text-white uppercase">
                      {category}
                  </h2>
                  <div className="w-16 md:w-24 h-0.5 md:h-1 bg-white mt-4 md:mt-6 rounded-full opacity-10"></div>
              </div>

              <div className="product-grid">
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