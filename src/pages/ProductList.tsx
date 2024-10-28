import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SlidersHorizontal, ShoppingCart, Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';

// Mock data - in a real app, this would come from an API
const products = {
  soccer: [
    { id: '1', name: 'Pro Soccer Ball', price: 89.99, image: 'https://images.unsplash.com/photo-1614632537423-1e6c2e7e0aab?auto=format&fit=crop&q=80&w=800' },
    { id: '2', name: 'Premium Soccer Cleats', price: 159.99, image: 'https://images.unsplash.com/photo-1511886929837-354d827aae26?auto=format&fit=crop&q=80&w=800' },
    { id: '3', name: 'Soccer Training Kit', price: 129.99, image: 'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&q=80&w=800' },
  ],
  basketball: [
    { id: '4', name: 'Pro Basketball', price: 79.99, image: 'https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&q=80&w=800' },
    { id: '5', name: 'Basketball Shoes', price: 129.99, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800' },
    { id: '6', name: 'Training Jersey', price: 49.99, image: 'https://images.unsplash.com/photo-1515523110800-9415d13b84a8?auto=format&fit=crop&q=80&w=800' },
  ],
  tennis: [
    { id: '7', name: 'Tennis Racket', price: 199.99, image: 'https://images.unsplash.com/photo-1617083934555-ac7d4fee8909?auto=format&fit=crop&q=80&w=800' },
    { id: '8', name: 'Tennis Balls (4-pack)', price: 9.99, image: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&q=80&w=800' },
    { id: '9', name: 'Tennis Shoes', price: 119.99, image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=800' },
  ],
  running: [
    { id: '10', name: 'Running Shoes', price: 149.99, image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=800' },
    { id: '11', name: 'Running Shorts', price: 39.99, image: 'https://images.unsplash.com/photo-1519315901367-f34ff9154487?auto=format&fit=crop&q=80&w=800' },
    { id: '12', name: 'Sports Watch', price: 199.99, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800' },
  ],
};

const ProductList = () => {
  const { category } = useParams<{ category: string }>();
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'name'>('name');
  const [showFilters, setShowFilters] = useState(false);
  const { dispatch } = useCart();

  const categoryProducts = category ? products[category as keyof typeof products] || [] : [];

  const sortedProducts = [...categoryProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  const handleAddToCart = (product: typeof categoryProducts[0]) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.image,
      },
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 capitalize">{category} Equipment</h1>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <SlidersHorizontal className="h-5 w-5" />
          <span>Filters</span>
        </button>
      </div>

      {showFilters && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="mb-6 p-4 bg-white rounded-lg shadow-md"
        >
          <div className="flex items-center gap-4">
            <label className="font-medium">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="p-2 border rounded-md"
            >
              <option value="name">Name</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sortedProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-lg overflow-hidden group"
          >
            <Link to={`/product/${product.id}`} className="block">
              <div className="aspect-w-1 aspect-h-1 bg-gray-200">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h2>
                <p className="text-gray-600 mb-4">${product.price.toFixed(2)}</p>
              </div>
            </Link>
            <div className="px-6 pb-6">
              <button
                onClick={() => handleAddToCart(product)}
                className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <ShoppingCart className="h-5 w-5" />
                Add to Cart
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {sortedProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No products found in this category.</p>
        </div>
      )}
    </div>
  );
};

export default ProductList;