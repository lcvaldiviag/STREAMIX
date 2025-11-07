
import React from 'react';
import { Product, Combo, Category } from '../types';
import { PRODUCTS, COMBOS } from '../constants';

interface CardProps {
  item: Product | Combo;
  onAddToCart: (item: Product | Combo) => void;
}

const isProduct = (item: Product | Combo): item is Product => 'logo' in item;

const Card: React.FC<CardProps> = ({ item, onAddToCart }) => {
  return (
    // Updated: More modern styling with larger radius and shadow.
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-1 hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      {isProduct(item) ? (
        // Updated: Reduced padding for a more compact card.
        <div className="p-4 flex-grow flex flex-col">
          <div className="flex items-center space-x-3 mb-3">
            {item.logo}
            {/* Updated: Smaller base font size. */}
            <h3 className="text-base font-semibold text-gray-800 leading-tight">{item.name}</h3>
          </div>
          {/* Updated: Smaller font size. */}
          <p className="text-xs text-gray-500 mt-1 flex-grow">{item.description || `Get the best offer for ${item.name}.`}</p>
        </div>
      ) : (
        <div className="flex-grow flex flex-col">
          {/* Updated: Reduced image height. */}
          <img className="h-32 w-full object-cover" src={item.image} alt={item.name} />
          {/* Updated: Reduced padding. */}
          <div className="p-4">
            {/* Updated: Smaller font size. */}
            <h3 className="text-base font-semibold text-gray-800 leading-tight">{item.name}</h3>
            <p className="text-xs text-gray-500 mt-1">Includes: {item.included.join(', ')}</p>
          </div>
        </div>
      )}
      {/* Updated: Reduced padding and semi-transparent background. */}
      <div className="p-4 bg-gray-50/50 flex items-center justify-between mt-auto">
        <div>
          {/* Updated: Adjusted font sizes. */}
          <p className="text-lg font-bold text-indigo-600">${item.priceUSD.toFixed(2)}</p>
          <p className="text-xs text-gray-500">BS. {item.priceBS.toFixed(2)}</p>
        </div>
        <button
          onClick={() => onAddToCart(item)}
          // Updated: Adjusted padding, font size, and border radius.
          className="px-3 py-1.5 bg-gradient-to-r from-sky-500 to-indigo-500 text-white text-sm font-semibold rounded-xl shadow-md hover:from-sky-600 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition"
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

const ProductList: React.FC<ProductListProps> = ({ onAddToCart }) => {
  const categories = Object.values(Category);
  const itemsByCategory = (category: Category) => {
    if (category === Category.COMBOS) return COMBOS;
    return PRODUCTS.filter(p => p.category === category);
  };

  return (
    <>
      <div className="mb-8">
        <p className="text-lg text-gray-600 font-bold italic">
          Entretenimiento premium, herramientas útiles y atención real en un solo lugar.
        </p>
      </div>
      <div className="space-y-12">
        {categories.map(category => {
          const items = itemsByCategory(category);
          if (items.length === 0) return null;

          if (category === Category.LIFESTYLE) {
            return (
              <section key={category} id={category.replace(/\s/g, '-')}>
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-6 pb-2 border-b-2 border-indigo-200">{category}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
                  <div className="md:col-span-1">
                    <Card item={items[0]} onAddToCart={onAddToCart} />
                  </div>
                  {/* Updated: Rounded corners to match new card style. */}
                  <div className="md:col-span-2 rounded-2xl overflow-hidden shadow-lg relative group">
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
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-6 pb-2 border-b-2 border-indigo-200">{category}</h2>
              {/* Updated: Responsive grid with 2 columns on mobile and smaller gaps. */}
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
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
