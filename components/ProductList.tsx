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
         <div className="absolute -top-2 -right-2 z-30 pointer-events-none animate-bounce">
            <span className="text-4xl filter drop-shadow-md" role="img" aria-label="Oferta especial">🎁</span>
         </div>
      )}

      {/* Main Card Container simulating the physical card + hanger */}
      <div className="flex flex-col h-full rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transform group-hover:-translate-y-2 transition-all duration-300 bg-white border border-gray-100">
        
        {/* TOP SECTION: The "Gift Card" itself */}
        <div 
            className="relative h-40 sm:h-48 flex flex-col items-center pt-3 shrink-0 overflow-hidden"
            style={{ 
                backgroundColor: isProduct(item) ? brandColor : '#333',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
        >
            {/* Combo Image Background if applicable */}
            {!isProduct(item) && (
                <div 
                    className="absolute inset-0 z-0 opacity-90 transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${item.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                />
            )}

            {/* Plastic Gloss Effect Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-black/10 z-10 pointer-events-none mix-blend-overlay" />
            
            {/* The "Hanger Hole" - Simulating the physical hole punch */}
            <div className="relative z-20 w-16 h-3 bg-slate-50 rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)] mb-4 mx-auto opacity-90"></div>

            {/* Logo / Brand Content */}
            <div className="relative z-20 flex-grow flex items-center justify-center w-full pb-6">
                {isProduct(item) ? (
                    <div className="flex flex-col items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                         {/* Text Logo with Glassmorphism backing for readability */}
                         <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center shadow-lg">
                            <span className="text-3xl font-extrabold text-white drop-shadow-md tracking-tighter">
                                {item.logo}
                            </span>
                         </div>
                    </div>
                ) : (
                    <div className="bg-black/40 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
                         <h3 className="text-white font-bold text-lg shadow-black drop-shadow-md text-center">{item.name}</h3>
                    </div>
                )}
            </div>
        </div>

        {/* BOTTOM SECTION: Info / Price Tag */}
        <div className="flex flex-col flex-grow p-4 bg-white relative">
            {/* Dashed line simulating tear-off part (optional aesthetic) */}
            <div className="absolute top-0 left-4 right-4 border-t border-dashed border-gray-300 opacity-50"></div>

            <div className="mt-2 mb-3 flex-grow">
                <h3 className={`text-lg font-bold leading-tight mb-1 ${isProduct(item) ? 'text-gray-800' : 'text-gray-800'}`}>
                    {item.name}
                </h3>
                <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                    {isProduct(item) ? item.description : `Incluye: ${item.included.join(', ')}`}
                </p>
            </div>

            <div className="flex items-end justify-between mt-auto pt-3 border-t border-slate-100 gap-2">
                <div className="flex flex-col min-w-0">
                     {originalPriceUSD && (
                        <span className="text-xs text-red-400 line-through font-semibold mb-0.5">
                            ${originalPriceUSD.toFixed(2)}
                        </span>
                    )}
                    <div className="flex items-baseline space-x-1">
                        <span className="text-lg sm:text-xl font-extrabold text-gray-900 tracking-tight">
                            ${item.priceUSD.toFixed(2)}
                        </span>
                        <span className="text-xs font-medium text-gray-400">USD</span>
                    </div>
                    <span className="text-xs text-gray-500 font-medium">
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
                        px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-bold shadow-md transform active:scale-95 transition-all whitespace-nowrap flex-shrink-0
                        ${isSoldOut 
                            ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
                            : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-lg focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
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
                    <h2 className="text-2xl font-bold text-gray-900">{category}</h2>
                    <div className="h-1 flex-grow bg-gradient-to-r from-gray-200 to-transparent rounded-full"></div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
                  <div className="md:col-span-1">
                    <Card item={items[0]} onAddToCart={onAddToCart} onProductSelect={onProductSelect} />
                  </div>
                  <div className="md:col-span-2 rounded-2xl overflow-hidden shadow-xl relative group h-full min-h-[300px]">
                    <img 
                      src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1200&auto=format&fit=crop" 
                      alt="Promoción de Estilo de Vida" 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-8 max-w-lg">
                      <h3 className="text-3xl font-extrabold text-white mb-2 leading-tight">Lleva tu estilo de vida al siguiente nivel</h3>
                      <p className="text-white/90 text-lg">Descubre ofertas exclusivas en bienestar y fitness.</p>
                    </div>
                  </div>
                </div>
              </section>
            );
          }

          return (
            <section key={category} id={category.replace(/\s/g, '-')}>
               <div className="flex items-center space-x-4 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900">{category}</h2>
                    <div className="h-1 flex-grow bg-gradient-to-r from-gray-200 to-transparent rounded-full"></div>
                </div>
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-3 gap-y-6 sm:gap-x-6 sm:gap-y-10">
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