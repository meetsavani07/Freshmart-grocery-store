import React from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Truck, Clock, Shield, Star, ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import LoginModal from '../components/LoginModal';

const categories = [
  { name: 'Fresh Fruits', image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80' },
  { name: 'Vegetables', image: 'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80' },
  { name: 'Dairy & Eggs', image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80' },
  { name: 'Bakery', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80' },
];

const popularProducts = [
  {
    id: 1,
    name: 'Organic Avocados',
    price: 3.99,
    image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    rating: 4.8
  },
  {
    id: 2,
    name: 'Fresh Strawberries',
    price: 4.99,
    image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    rating: 4.7
  },
  {
    id: 3,
    name: 'Greek Yogurt',
    price: 2.99,
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    rating: 4.6
  },
  {
    id: 4,
    name: 'Organic Honey',
    price: 6.99,
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    rating: 4.9
  },
  {
    id: 9,
    name: 'Fresh Oranges',
    price: 3.49,
    image: 'https://images.unsplash.com/photo-1547514701-42782101795e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    rating: 4.7
  },
  {
    id: 10,
    name: 'Organic Blueberries',
    price: 5.99,
    image: 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    rating: 4.8
  }
];

const bestSelling = [
  {
    id: 5,
    name: 'Fresh Eggs',
    price: 3.49,
    image: 'https://images.unsplash.com/photo-1506976785307-8732e854ad03?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    rating: 4.8
  },
  {
    id: 6,
    name: 'Whole Grain Bread',
    price: 2.99,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    rating: 4.7
  },
  {
    id: 7,
    name: 'Organic Milk',
    price: 4.49,
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    rating: 4.6
  },
  {
    id: 8,
    name: 'Fresh Tomatoes',
    price: 2.99,
    image: 'https://images.unsplash.com/photo-1546470427-1ec6b777bb5e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    rating: 4.5
  },
  {
    id: 11,
    name: 'Organic Spinach',
    price: 2.49,
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    rating: 4.6
  },
  {
    id: 12,
    name: 'Fresh Salmon',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1574781330855-d0db8cc6a79c?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    rating: 4.9
  }
];

const testimonials = [
  {
    name: "Sarah Johnson",
    text: "FreshMart has transformed how I shop for groceries. The quality is outstanding!",
    role: "Regular Customer",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80"
  },
  {
    name: "Michael Chen",
    text: "The freshness and convenience are unmatched. I recommend FreshMart to everyone!",
    role: "Verified Buyer",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80"
  }
];

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05 }}
      className="bg-white rounded-lg shadow-md overflow-hidden min-w-[280px] max-w-[280px] mx-2"
    >
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
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
          onClick={() => onAddToCart(product)}
          className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors flex items-center justify-center"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add to Cart
        </button>
      </div>
    </motion.div>
  );
};

const ScrollableProductSection = ({ title, products, onAddToCart }) => {
  const scrollContainerRef = React.useRef(null);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center mb-12"
        >
          {title}
        </motion.h2>
        <div className="relative">
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 z-10"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <div
            ref={scrollContainerRef}
            className="overflow-x-auto pb-6 scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <div className="flex space-x-4" style={{ minWidth: 'min-content' }}>
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={onAddToCart}
                />
              ))}
            </div>
          </div>
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 z-10"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </div>
    </section>
  );
};

const Home = () => {
  const { addToCart } = useCart();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleAddToCart = (product) => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      setIsLoginModalOpen(true);
    } else {
      addToCart(product);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="h-screen relative"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
        
        <div className="relative h-full flex items-center justify-center text-white">
          <div className="text-center">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-6xl font-bold mb-4"
            >
              Fresh & Healthy
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl mb-8"
            >
              Quality groceries delivered to your doorstep
            </motion.p>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Link
                to="/shop"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full inline-flex items-center"
              >
                Shop Now <ArrowRight className="ml-2" />
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-md text-center"
            >
              <Truck className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Free Delivery</h3>
              <p className="text-gray-600">On orders over $50</p>
            </motion.div>
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white p-6 rounded-lg shadow-md text-center"
            >
              <Clock className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Same-day delivery available</p>
            </motion.div>
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="bg-white p-6 rounded-lg shadow-md text-center"
            >
              <Shield className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Secure Payment</h3>
              <p className="text-gray-600">100% secure checkout</p>
            </motion.div>
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="bg-white p-6 rounded-lg shadow-md text-center"
            >
              <Star className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Best Quality</h3>
              <p className="text-gray-600">Handpicked products</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Popular Products Section */}
      <ScrollableProductSection
        title="Popular Products"
        products={popularProducts}
        onAddToCart={handleAddToCart}
      />

      {/* Best Selling Section */}
      <ScrollableProductSection
        title="Best Selling Everyday"
        products={bestSelling}
        onAddToCart={handleAddToCart}
      />

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-12"
          >
            Shop by Category
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative rounded-lg overflow-hidden group cursor-pointer"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <h3 className="text-white text-xl font-bold">{category.name}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </div>
  );
};

export default Home;