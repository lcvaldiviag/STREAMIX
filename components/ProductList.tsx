
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
      className="relative h-full group cursor-pointer select-none"
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

      {/* Special Offer Badge - Floating outside slightly */}
      {isSpecialOffer && (
         <div className="absolute -top-3 -right-3 z-30 pointer-events-none animate-bounce">
            <span className="text-4xl filter drop-shadow-md" role="img" aria-label="Oferta especial">🎁</span>
         </div>
      )}

      {/* Main Card Container - Glassmorphism Style (Adaptive) */}
      <div className={`flex flex-col h-full rounded-2xl overflow-hidden shadow-lg hover:shadow-xl hover:shadow-indigo-500/10 bg-white/60 dark:bg-slate-900/40 backdrop-blur-md border border-slate-200/60 dark:border-white/5 ring-1 ring-black/5 dark:ring-white/5 transition-all duration-500 ease-out ${isAdded ? 'scale-95 ring-2 ring-indigo-500' : 'transform group-hover:-translate-y-[2px] group-hover:border-slate-300 dark:group-hover:border-white/10'}`}>
        
        {/* TOP SECTION: The "Gift Card" itself */}
        <div 
            className="relative h-40 sm:h-44 flex flex-col items-center pt-3 shrink-0 overflow-hidden"
            style={{ 
                backgroundColor: isProduct(item) ? brandColor : '#1e293b',
                backgroundImage: isProduct(item) 
                  ? `radial-gradient(circle at top, rgba(255,255,255,0.2), transparent 70%)` 
                  : undefined,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
        >
            {/* Combo Image Background if applicable */}
            {!isProduct(item) && (
                <div 
                    className="absolute inset-0 z-0 opacity-80 transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url(${item.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                />
            )}

            {/* Subtle Plastic/Paper Gloss Effect Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/15 to-transparent z-10 pointer-events-none mix-blend-overlay" />
            
            {/* The "Hanger Hole" */}
            <div className="relative z-20 w-12 h-3 bg-slate-100/30 dark:bg-slate-950/50 rounded-full shadow-inner mb-3 mx-auto backdrop-blur-sm border border-white/10"></div>

            {/* Logo / Brand Content */}
            <div className="relative z-20 flex-grow flex items-center justify-center w-full pb-6">
                {isProduct(item) ? (
                    <div className="flex flex-col items-center justify-center transform group-hover:scale-105 transition-transform duration-500 ease-out">
                         {/* Text Logo with subtle backing */}
                         <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-black/20 backdrop-blur-[4px] border border-white/15 flex items-center justify-center shadow-xl">
                            <span className="text-2xl sm:text-3xl font-extrabold text-white drop-shadow-md tracking-tighter filter">
                                {item.logo}
                            </span>
                         </div>
                    </div>
                ) : (
                    <div className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-lg border border-white/15 shadow-lg mx-4 transform group-hover:scale-105 transition-transform duration-500 ease-out">
                         <h3 className="text-white font-bold text-base sm:text-lg text-center tracking-wide leading-tight">{item.name}</h3>
                    </div>
                )}
            </div>
        </div>

        {/* BOTTOM SECTION: Info / Price Tag - Adaptive Theme */}
        <div className="flex flex-col flex-grow p-4 bg-white/80 dark:bg-slate-900/60 relative border-t border-slate-200 dark:border-white/5">
            {/* Subtle separator */}
            <div className="absolute top-0 left-6 right-6 border-t border-dashed border-slate-300 dark:border-white/10"></div>

            <div className="mt-2 mb-3 flex-grow">
                <h3 className={`text-base sm:text-lg font-bold leading-tight mb-1 text-slate-800 dark:text-slate-100`}>
                    {item.name}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed font-medium">
                    {isProduct(item) ? item.description : `Incluye: ${item.included.join(', ')}`}
                </p>
            </div>

            <div className="flex items-end justify-between mt-auto pt-3 border-t border-slate-200 dark:border-white/5 gap-2">
                <div className="flex flex-col min-w-0">
                     {originalPriceUSD && (
                        <span className="text-[10px] text-red-500 dark:text-red-400 line-through font-semibold mb-0.5 ml-0.5">
                            ${originalPriceUSD.toFixed(2)}
                        </span>
                    )}
                    <div className="flex items-baseline space-x-1">
                        <span className="text-xl font-black text-slate-900 dark:text-white tracking-tight drop-shadow-sm">
                            ${item.priceUSD.toFixed(2)}
                        </span>
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">USD</span>
                    </div>
                    <span className="text-[10px] text-slate-500 font-medium ml-0.5">
                        BS. {item.priceBS.toFixed(2)}
                    </span>
                </div>

                <button
                    onClick={handleAddClick}
                    disabled={isSoldOut}
                    className={`
                        px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-bold shadow-md transform active:scale-95 transition-all whitespace-nowrap flex-shrink-0 flex items-center justify-center min-w-[80px]
                        ${isSoldOut 
                            ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed border border-slate-300 dark:border-slate-700' 
                            : 'bg-gradient-to-r from-indigo-700 to-purple-700 dark:from-indigo-600 dark:to-purple-600 text-white hover:from-indigo-600 hover:to-purple-600 dark:hover:from-indigo-500 dark:hover:to-purple-500 border border-transparent dark:border-white/10'
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
        <h2 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-700 to-slate-500 dark:from-slate-200 dark:to-slate-500 tracking-tight mb-4 leading-tight">
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
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">{category}</h2>
                    <div className="h-[1px] flex-grow bg-gradient-to-r from-slate-300/50 to-transparent dark:from-white/20 dark:to-transparent rounded-full"></div>
                </div>
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8 sm:gap-x-8 sm:gap-y-12">
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
