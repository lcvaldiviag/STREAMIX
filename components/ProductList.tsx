import React from 'react';
import { Product, Combo, Category } from '../types';
import { PRODUCTS, COMBOS, PlaceholderIcon } from '../constants';

interface CardProps {
  item: Product | Combo;
  onAddToCart: (item: Product | Combo) => void;
}

const isProduct = (item: Product | Combo): item is Product => 'logo' in item;

// Updated Card component to match the screenshot's aesthetics
const Card: React.FC<CardProps> = ({ item, onAddToCart }) => {
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200/80 overflow-hidden transform hover:-translate-y-1 hover:shadow-lg transition-all duration-300 flex flex-col h-full">
      {isProduct(item) ? (
        <div className="p-5 flex-grow flex flex-col">
          <div className="flex items-center space-x-4 mb-2">
            <PlaceholderIcon icon={item.logo} />
            <h3 className="text-lg font-semibold text-gray-900 leading-tight">{item.name}</h3>
          </div>
          <p className="text-sm text-gray-600 mt-1 flex-grow">{item.description || `Get the best offer for ${item.name}.`}</p>
        </div>
      ) : (
        <div className="flex-grow flex flex-col">
          <img className="h-32 w-full object-cover" src={item.image} alt={item.name} />
          <div className="p-5">
            <h3 className="text-lg font-semibold text-gray-900 leading-tight">{item.name}</h3>
            <p className="text-sm text-gray-600 mt-1">Includes: {item.included.join(', ')}</p>
          </div>
        </div>
      )}
      <div className="p-5 bg-gray-50 flex items-center justify-between mt-auto border-t border-gray-100">
        <div>
          <p className="text-xl font-bold text-blue-600">${item.priceUSD.toFixed(2)}</p>
          <p className="text-sm text-gray-500">BS. {item.priceBS.toFixed(2)}</p>
        </div>
        <button
          onClick={() => onAddToCart(item)}
          className="px-5 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-bold rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
        >
          Add
        </button>
      </div>
    </div>
  );
};


interface ProductListProps {
  onAddToCart: (item: Product | Combo) => void;
}

const ProductList = ({ onAddToCart }: ProductListProps) => {
  const categories = Object.values(Category);
  const itemsByCategory = (category: Category) => {
    if (category === Category.COMBOS) return COMBOS;
    return PRODUCTS.filter(p => p.category === category);
  };

  return (
    <>
      <div className="mb-8">
        <p className="text-xl text-gray-700 font-medium">
          Entretenimiento premium, herramientas útiles y atención real en un solo lugar.
        </p>
      </div>
      <div className="space-y-16">
        {categories.map(category => {
          const items = itemsByCategory(category);
          if (items.length === 0) return null;

          if (category === Category.LIFESTYLE) {
            return (
              <section key={category} id={category.replace(/\s/g, '-')}>
                <h2 className="text-2xl font-bold tracking-tight text-gray-800 mb-6 pb-2 border-b-2 border-gray-300">{category}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
                  <div className="md:col-span-1">
                    <Card item={items[0]} onAddToCart={onAddToCart} />
                  </div>
                  <div className="md:col-span-2 rounded-xl overflow-hidden shadow-lg relative group">
                    <img 
                      src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1200&auto=format&fit=crop" 
                      alt="Lifestyle promotion" 
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
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
              <h2 className="text-2xl font-bold tracking-tight text-gray-800 mb-6 pb-2 border-b-2 border-gray-300">{category}</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-6">
                {items.map(item => (
                  <Card key={item.id} item={item} onAddToCart={onAddToCart} />
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