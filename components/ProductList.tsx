
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
  const brandColor = isProduct(item) ? item.brandColor : undefined;
  const isSoldOut = isProduct(item) ? item.soldOut : false;
  const isSpecialOffer = isProduct(item) ? item.specialOffer : false;
  const originalPriceUSD = isProduct(item) ? item.originalPriceUSD : undefined;
  
  // State for handling the "Add to Cart" animation
  const [isAdded, setIsAdded] = useState(false);

  const handleAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSoldOut) return;
    
    onAddToCart(item);
    setIsAdded(true);
    
    // Reset animation state after it completes
    setTimeout(() => setIsAdded(false), 800);
  };

  return (
    <div 
      className="relative h-full group cursor-pointer select-none perspective-1000"
      onClick={() => onProductSelect(item)}
    >
      {/* Flying +1 Animation - Appears when item is added */}
      {isAdded && (
         <div className="absolute bottom-12 right-8 z-50 pointer-events-none">
            <div className="animate-add-to-cart bg-indigo-600 dark:bg-indigo-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg border border-white/20">
                +1
            </div>
         </div>
      )}

      {/* Special Offer Badge */}
      {isSpecialOffer && (
         <div className="absolute -top-4 -right-4 z-30 pointer-events-none animate-bounce">
            <span className="text-5xl filter drop-shadow-lg" role="img" aria-label="Oferta especial">🎁</span>
         </div>
      )}

      {/* Main Card Container - Gift Card Style */}
      <div className={`
          flex flex-col h-full 
          rounded-[2rem] 
          overflow-hidden 
          shadow-[0_8px_30px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.4)]
          hover:shadow-[0_20px_40px_-10px_rgba(99,102,241,0.2)] dark:hover:shadow-[0_20px_40px_-10px_rgba(99,102,241,0.3)]
          bg-white dark:bg-slate-800 
          border border-slate-200 dark:border-slate-700 
          transition-all duration-500 ease-out 
          transform-gpu
          ${isAdded ? 'scale-95' : 'group-hover:-translate-y-2 group-hover:rotate-1'}
      `}>
        
        {/* TOP SECTION: The "Gift Card" body */}
        <div 
            className="relative h-48 flex flex-col items-center pt-4 shrink-0 overflow-hidden"
            style={{ 
                backgroundColor: isProduct(item) ? brandColor : '#1e293b',
                backgroundImage: isProduct(item) 
                  ? `radial-gradient(circle at 50% 0%, rgba(255,255,255,0.25), transparent 60%), radial-gradient(circle at 50% 100%, rgba(0,0,0,0.1), transparent 50%)` 
                  : undefined,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
        >
            {/* Combo Image Background if applicable */}
            {!isProduct(item) && (
                <div 
                    className="absolute inset-0 z-0 opacity-80 transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${item.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                />
            )}

            {/* Glossy Overlays for Plastic Effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-black/10 z-10 pointer-events-none mix-blend-overlay" />
            
            {/* THE HANGER HOLE (Ranura) - Simulating transparency */}
            <div className="relative z-20 w-16 h-4 bg-slate-50 dark:bg-slate-950 rounded-full shadow-[inset_0_2px_3px_rgba(0,0,0,0.6),0_1px_1px_rgba(255,255,255,0.2)] mb-4 mx-auto border border-black/5 dark:border-white/5"></div>

            {/* Logo / Brand Content */}
            <div className="relative z-20 flex-grow flex items-center justify-center w-full pb-6">
                {isProduct(item) ? (
                    <div className="transform transition-transform duration-500 group-hover:scale-110 filter drop-shadow-lg">
                         <div className="w-20 h-20 rounded-2xl bg-black/20 backdrop-blur-[2px] border border-white/20 flex items-center justify-center shadow-2xl">
                            <span className="text-4xl font-black text-white tracking-tighter">
                                {item.logo}
                            </span>
                         </div>
                    </div>
                ) : (
                    <div className="bg-black/60 backdrop-blur-md px-5 py-3 rounded-xl border border-white/10 shadow-xl mx-6 text-center transform transition-transform duration-500 group-hover:scale-105">
                         <h3 className="text-white font-bold text-lg tracking-wide leading-tight">{item.name}</h3>
                    </div>
                )}
            </div>
        </div>

        {/* BOTTOM SECTION: Info / Price Tag */}
        <div className="flex flex-col flex-grow p-5 bg-white dark:bg-slate-800 relative">
            {/* Dashed line separator */}
            <div className="absolute top-0 left-4 right-4 border-t-2 border-dashed border-slate-200 dark:border-slate-700"></div>

            <div className="mt-3 mb-4 flex-grow">
                <h3 className="text-lg font-bold leading-tight mb-2 text-slate-900 dark:text-white">
                    {item.name}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                    {isProduct(item) ? item.description : `Incluye: ${item.included.join(', ')}`}
                </p>
            </div>

            <div className="flex items-end justify-between mt-auto gap-3 pt-4 border-t border-slate-100 dark:border-slate-700/50">
                <div className="flex flex-col min-w-0">
                     {originalPriceUSD && (
                        <span className="text-xs text-red-500 dark:text-red-400 line-through font-bold mb-0.5">
                            ${originalPriceUSD.toFixed(2)}
                        </span>
                    )}
                    <div className="flex items-baseline space-x-1">
                        <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                            ${item.priceUSD.toFixed(2)}
                        </span>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">USD</span>
                    </div>
                    <span className="text-xs text-slate-500 font-semibold">
                        BS. {item.priceBS.toFixed(2)}
                    </span>
                </div>

                <button
                    onClick={handleAddClick}
                    disabled={isSoldOut}
                    className={`
                        px-4 py-2.5 rounded-xl text-sm font-bold shadow-md transform active:scale-95 transition-all whitespace-nowrap flex-shrink-0 min-w-[90px]
                        ${isSoldOut 
                            ? 'bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed' 
                            : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white hover:shadow-lg hover:shadow-indigo-500/30'
                        }
                    `}
                >
                    {isSoldOut ? 'Agotado' : 'Añadir'}
                </button>
            </div>
        </div>

      </div>
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
    
    let items: (Product | Combo)[] = [];
    if (category === Category.COMBOS) {
      items = COMBOS;
    } else {
      items = PRODUCTS.filter(p => p.category === category);
    }

    if (!searchQuery) {
      return items;
    }

    return items.filter(item => item.name.toLowerCase().includes(lowerCaseQuery));
  };
  
  const categoriesToRender = selectedCategory === 'Todos los Productos' 
    ? allCategories 
    : [selectedCategory];

  return (
    <>
      <div className="mb-10 text-center lg:text-left">
        <h2 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-800 to-slate-500 dark:from-white dark:to-slate-400 tracking-tight mb-4 leading-tight">
          Entretenimiento premium y herramientas poderosas.
        </h2>
      </div>

      <div className="space-y-20 pb-20">
        {categoriesToRender.map(category => {
          const items = getFilteredItems(category);
          if (items.length === 0) return null;

          // Special layout for Lifestyle category
          if (category === Category.LIFESTYLE && selectedCategory === 'Todos los Productos') {
             return (
              <section key={category} id={category.replace(/\s/g, '-')}>
                <div className="flex items-center space-x-4 mb-8">
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">{category}</h2>
                    <div className="h-[1px] flex-grow bg-gradient-to-r from-slate-300/50 to-transparent dark:from-white/20 dark:to-transparent rounded-full"></div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
                  <div className="md:col-span-1">
                    <Card item={items[0]} onAddToCart={onAddToCart} onProductSelect={onProductSelect} />
                  </div>
                  <div className="md:col-span-2 rounded-2xl overflow-hidden shadow-xl relative group h-full min-h-[300px] border border-slate-200 dark:border-white/10">
                    <img 
                      src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1200&auto=format&fit=crop" 
                      alt="Promoción de Estilo de Vida" 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 dark:opacity-80" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-8 max-w-lg">
                      <h3 className="text-3xl font-extrabold text-white mb-3 leading-tight drop-shadow-lg">Lleva tu estilo de vida al siguiente nivel</h3>
                      <p className="text-slate-100 text-lg font-medium drop-shadow-md">Descubre ofertas exclusivas en bienestar y fitness.</p>
                    </div>
                  </div>
                </div>
              </section>
            );
          }

          return (
            <section key={category} id={category.replace(/\s/g, '-')}>
               <div className="flex items-center space-x-4 mb-8">
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-white tracking-tight">{category}</h2>
                    <div className="h-[1px] flex-grow bg-gradient-to-r from-slate-300 to-transparent dark:from-white/20 rounded-full"></div>
                </div>
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10 sm:gap-x-8 sm:gap-y-12">
                {items.map(item => (
                  <Card key={item.id} item={item} onAddToCart={onAddToCart} onProductSelect={onProductSelect} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
};

export default ProductList;
