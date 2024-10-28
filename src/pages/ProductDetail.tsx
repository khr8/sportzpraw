import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Minus, Plus, ShoppingCart, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';

// Mock data - in a real app, this would come from an API
const products = {
  '1': {
    id: '1',
    name: 'Pro Soccer Ball',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1614632537423-1e6c2e7e0aab?auto=format&fit=crop&q=80&w=800',
    description: 'Professional-grade soccer ball designed for optimal performance. Features premium materials and excellent durability.',
    rating: 4.5,
    reviews: 128,
    specs: [
      'FIFA Quality Pro certified',
      'Hand-stitched panels',
      'Premium synthetic leather',
      'Size 5 regulation ball',
    ],
  },
  // Add more products as needed
};

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { dispatch } = useCart();
  const [quantity, setQuantity] = useState(1);

  const product = id ? products[id as keyof typeof products] : null;

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Product not found</h2>
        <button
          onClick={() => navigate('/')}
          className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Return to Home
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity,
        image: product.image,
      },
    });
    navigate('/cart');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="aspect-w-1 aspect-h-1 bg-gray-100 rounded-lg overflow-hidden"
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
          
          <div className="flex items-center mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(product.rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="ml-2 text-gray-600">({product.reviews} reviews)</span>
          </div>

          <p className="text-2xl font-bold text-gray-900 mb-6">${product.price.toFixed(2)}</p>

          <p className="text-gray-600 mb-6">{product.description}</p>

          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-2">Specifications:</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              {product.specs.map((spec, index) => (
                <li key={index}>{spec}</li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-2 rounded-md border hover:bg-gray-100"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="text-xl font-medium">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="p-2 rounded-md border hover:bg-gray-100"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>

          <button
            onClick={handleAddToCart}
            className="flex items-center justify-center gap-2 w-full bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <ShoppingCart className="h-5 w-5" />
            Add to Cart
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetail;