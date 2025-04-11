import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ShoppingCart, Heart } from 'lucide-react';
import LoginModal from '../components/LoginModal';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const categories = ['All', 'Fruits', 'Vegetables', 'Dairy', 'Bakery', 'Meat', 'Beverages'];

const products = [
  {
    id: 1,
    name: 'Fresh Apples',
    price: 2.99,
    category: 'Fruits',
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    rating: 4.5,
    organic: true
  },
  {
    id: 2,
    name: 'Organic Bananas',
    price: 1.99,
    category: 'Fruits',
    image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    rating: 4.8,
    organic: true
  },
  {
    id: 3,
    name: 'Fresh Vegetables Mix',
    price: 4.99,
    category: 'Vegetables',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    rating: 4.3,
    organic: false
  },
  {
    id: 4,
    name: 'Whole Milk',
    price: 3.49,
    category: 'Dairy',
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    rating: 4.6,
    organic: true
  },
  {
    id: 5,
    name: 'Fresh Bread',
    price: 2.49,
    category: 'Bakery',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    rating: 4.7,
    organic: false
    
  },
  {
    id: 6,
    name: 'Orange Juice',
    price: 3.99,
    category: 'Beverages',
    image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    rating: 4.4,
    organic: true
  },
  {
    id: 7,
    name: 'Fresh Tomatoes',
    price: 2.99,
    category: 'Vegetables',
    image: 'https://unsplash.com/photos/a-group-of-tomatoes-sitting-on-top-of-a-cutting-board-hEu2_nC1jqg',
    rating: 4.2,
    organic: true
  },
  {
    id: 8,
    name: ' ',
    price: 7.99,
    category: 'Meat',
    image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    rating: 4.6,
    organic: false
  },
];

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (product: any) => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      setIsLoginModalOpen(true);
    } else {
      addToCart(product);
    }
  };

  const handleWishlist = (product: any) => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      setIsLoginModalOpen(true);
      return;
    }
    
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header and Search */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold mb-4 md:mb-0"
          >
            Our Products
          </motion.h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-full w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>
        </div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap gap-4 mb-8"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full ${
                selectedCategory === category
                  ? 'bg-green-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                {product.organic && (
                  <span className="absolute top-2 right-2 bg-green-600 text-white px-2 py-1 rounded-full text-sm">
                    Organic
                  </span>
                )}
                <button
                  onClick={() => handleWishlist(product)}
                  className={`absolute top-2 left-2 p-2 rounded-full ${
                    isInWishlist(product.id)
                      ? 'bg-red-100 text-red-600'
                      : 'bg-gray-100 text-gray-600'
                  } hover:bg-red-100 hover:text-red-600 transition-colors`}
                >
                  <Heart
                    className={`w-5 h-5 ${
                      isInWishlist(product.id) ? 'fill-current' : ''
                    }`}
                  />
                </button>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <span className="text-green-600 font-bold">${product.price}</span>
                </div>
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < Math.floor(product.rating) ? '★' : '☆'}>
                      </span>
                    ))}
                  </div>
                  <span className="text-gray-600 text-sm ml-2">{product.rating}</span>
                </div>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors flex items-center justify-center"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* No Results Message */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No products found matching your criteria.</p>
          </div>
        )}
      </div>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </div>
  );
};

export default Shop;