import React from 'react';
import { Product, Combo, Category } from '../types';
import { PRODUCTS, COMBOS, PlaceholderIcon } from '../constants';

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
      onClick={() => onProductSelect(item)}
      className="bg-white rounded-xl border border-slate-200 overflow-hidden transform hover:-translate-y-1 hover:shadow-xl transition-all duration-300 flex flex-col h-full group cursor-pointer relative"
      style={{ borderTop: `4px solid ${brandColor || 'transparent'}` }}
    >
      {isSpecialOffer && (
         <div className="absolute -top-3 -right-3 z-20 pointer-events-none animate-bounce">
            <span className="text-4xl filter drop-shadow-md" role="img" aria-label="Oferta especial">🎁</span>
         </div>
      )}

      {isProduct(item) ? (
        <div className="p-4 sm:p-5 flex-grow flex flex-col relative">
          <div className="flex items-center space-x-4 mb-2">
            <PlaceholderIcon icon={item.logo} color={brandColor} />
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 leading-tight">{item.name}</h3>
          </div>
          <p className="text-sm text-gray-500 mt-1 flex-grow line-clamp-2">{item.description || `Obtén la mejor oferta para ${item.name}.`}</p>
        </div>
      ) : (
        <div className="flex-grow flex flex-col relative">
          <div className="overflow-hidden">
            <img className="h-32 w-full object-cover group-hover:scale-105 transition-transform duration-300" src={item.image} alt={item.name} />
          </div>
          <div className="p-4 sm:p-5">
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 leading-tight">{item.name}</h3>
            <p className="text-sm text-gray-500 mt-1">Incluye: {item.included.join(', ')}</p>
          </div>
        </div>
      )}
      <div className="p-4 sm:p-5 bg-slate-50 flex items-center justify-between mt-auto border-t border-slate-200">
        <div>
          {originalPriceUSD && (
             <p className="text-xs text-gray-400 line-through font-medium leading-none mb-1">
               ${originalPriceUSD.toFixed(2)}
             </p>
          )}
          <p className="text-lg sm:text-xl font-bold text-indigo-600">${item.priceUSD.toFixed(2)}</p>
          <p className="text-sm text-gray-500">BS. {item.priceBS.toFixed(2)}</p>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevent card click when adding to cart
            onAddToCart(item);
          }}
          disabled={isSoldOut}
          className={`px-4 sm:px-5 py-2 text-white text-sm font-bold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-50 transition-all ${
            isSoldOut 
            ? 'bg-gray-400 cursor-not-allowed hover:bg-gray-400' 
            : 'bg-indigo-600 hover:bg-indigo-500 focus:ring-indigo-500'
          }`}
        >
          {isSoldOut ? 'Agotado' : 'Añadir'}
        </button>
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
      <div className="mb-12">
        <p className="text-lg sm:text-xl text-gray-600 font-semibold uppercase tracking-wide">
          Entretenimiento premium, herramientas poderosas y soporte real, todo en un solo lugar.
        </p>
      </div>
      <div className="space-y-16">
        {categoriesToRender.map(category => {
          const items = getFilteredItems(category);
          if (items.length === 0) return null;

          // Special layout for Lifestyle category
          if (category === Category.LIFESTYLE && selectedCategory === 'Todos los Productos') {
             return (
              <section key={category} id={category.replace(/\s/g, '-')}>
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-6 pb-2 border-b-2 border-gray-200">{category}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
                  <div className="md:col-span-1">
                    <Card item={items[0]} onAddToCart={onAddToCart} onProductSelect={onProductSelect} />
                  </div>
                  <div className="md:col-span-2 rounded-xl overflow-hidden shadow-lg relative group">
                    <img 
                      src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1200&auto=format&fit=crop" 
                      alt="Promoción de Estilo de Vida" 
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-6">
                      <h3 className="text-2xl font-bold text-white">Lleva tu estilo de vida al siguiente nivel</h3>
                      <p className="text-white/90 mt-2">Descubre ofertas exclusivas en bienestar y fitness.</p>
                    </div>
                  </div>
                </div>
              </section>
            );
          }

          return (
            <section key={category} id={category.replace(/\s/g, '-')}>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-6 pb-2 border-b-2 border-gray-200">{category}</h2>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
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