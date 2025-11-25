import React from 'react';
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

  return (
    <div 
      className="relative h-full group cursor-pointer select-none"
      onClick={() => onProductSelect(item)}
    >
      {/* Special Offer Badge - Floating outside slightly */}
      {isSpecialOffer && (
         <div className="absolute -top-3 -right-3 z-30 pointer-events-none animate-bounce">
            <span className="text-4xl filter drop-shadow-md" role="img" aria-label="Oferta especial">🎁</span>
         </div>
      )}

      {/* Main Card Container simulating the physical card + hanger */}
      <div className="flex flex-col h-full rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:shadow-indigo-500/10 transform group-hover:-translate-y-1 transition-all duration-300 bg-white border border-slate-100 ring-1 ring-slate-900/5">
        
        {/* TOP SECTION: The "Gift Card" itself */}
        <div 
            className="relative h-40 sm:h-44 flex flex-col items-center pt-3 shrink-0 overflow-hidden"
            style={{ 
                backgroundColor: isProduct(item) ? brandColor : '#333',
                backgroundImage: isProduct(item) 
                  ? `radial-gradient(circle at top, rgba(255,255,255,0.15), transparent 80%)` 
                  : undefined,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
        >
            {/* Combo Image Background if applicable */}
            {!isProduct(item) && (
                <div 
                    className="absolute inset-0 z-0 opacity-90 transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url(${item.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                />
            )}

            {/* Subtle Plastic/Paper Gloss Effect Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent z-10 pointer-events-none mix-blend-overlay" />
            
            {/* The "Hanger Hole" - More discreet and realistic */}
            <div className="relative z-20 w-12 h-3 bg-slate-50 rounded-full shadow-[inset_0_1px_2px_rgba(0,0,0,0.15),0_1px_0_rgba(255,255,255,0.2)] mb-3 mx-auto opacity-90"></div>

            {/* Logo / Brand Content */}
            <div className="relative z-20 flex-grow flex items-center justify-center w-full pb-6">
                {isProduct(item) ? (
                    <div className="flex flex-col items-center justify-center transform group-hover:scale-105 transition-transform duration-300">
                         {/* Text Logo with subtle backing */}
                         <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/10 backdrop-blur-[2px] border border-white/20 flex items-center justify-center shadow-lg">
                            <span className="text-2xl sm:text-3xl font-extrabold text-white drop-shadow-sm tracking-tighter filter">
                                {item.logo}
                            </span>
                         </div>
                    </div>
                ) : (
                    <div className="bg-black/60 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/10 shadow-md mx-4">
                         <h3 className="text-white font-bold text-base sm:text-lg text-center tracking-wide leading-tight">{item.name}</h3>
                    </div>
                )}
            </div>
        </div>

        {/* BOTTOM SECTION: Info / Price Tag */}
        <div className="flex flex-col flex-grow p-4 bg-white relative">
            {/* Subtle separator */}
            <div className="absolute top-0 left-6 right-6 border-t border-dashed border-gray-100"></div>

            <div className="mt-2 mb-3 flex-grow">
                <h3 className={`text-base sm:text-lg font-bold leading-tight mb-1 ${isProduct(item) ? 'text-gray-800' : 'text-gray-900'}`}>
                    {item.name}
                </h3>
                <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed font-medium">
                    {isProduct(item) ? item.description : `Incluye: ${item.included.join(', ')}`}
                </p>
            </div>

            <div className="flex items-end justify-between mt-auto pt-3 border-t border-slate-50 gap-2">
                <div className="flex flex-col min-w-0">
                     {originalPriceUSD && (
                        <span className="text-[10px] text-red-400 line-through font-semibold mb-0.5 ml-0.5">
                            ${originalPriceUSD.toFixed(2)}
                        </span>
                    )}
                    <div className="flex items-baseline space-x-1">
                        <span className="text-xl font-black text-gray-900 tracking-tight">
                            ${item.priceUSD.toFixed(2)}
                        </span>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">USD</span>
                    </div>
                    <span className="text-[10px] text-gray-400 font-medium ml-0.5">
                        BS. {item.priceBS.toFixed(2)}
                    </span>
                </div>

                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(item);
                    }}
                    disabled={isSoldOut}
                    className={`
                        px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs font-bold shadow-sm transform active:scale-95 transition-all whitespace-nowrap flex-shrink-0 flex items-center justify-center
                        ${isSoldOut 
                            ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200' 
                            : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-md focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1'
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
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-500 tracking-tight mb-4 leading-tight">
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
                    <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{category}</h2>
                    <div className="h-1 flex-grow bg-gradient-to-r from-gray-200 to-transparent rounded-full opacity-50"></div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
                  <div className="md:col-span-1">
                    <Card item={items[0]} onAddToCart={onAddToCart} onProductSelect={onProductSelect} />
                  </div>
                  <div className="md:col-span-2 rounded-2xl overflow-hidden shadow-2xl relative group h-full min-h-[300px]">
                    <img 
                      src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1200&auto=format&fit=crop" 
                      alt="Promoción de Estilo de Vida" 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-8 max-w-lg">
                      <h3 className="text-3xl font-extrabold text-white mb-3 leading-tight drop-shadow-lg">Lleva tu estilo de vida al siguiente nivel</h3>
                      <p className="text-white/90 text-lg font-medium drop-shadow-md">Descubre ofertas exclusivas en bienestar y fitness.</p>
                    </div>
                  </div>
                </div>
              </section>
            );
          }

          return (
            <section key={category} id={category.replace(/\s/g, '-')}>
               <div className="flex items-center space-x-4 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{category}</h2>
                    <div className="h-1 flex-grow bg-gradient-to-r from-gray-200 to-transparent rounded-full opacity-50"></div>
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