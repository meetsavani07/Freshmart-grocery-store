import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { User, Package, Heart, LogOut, Trash2, ShoppingCart } from 'lucide-react';
import { useOrders } from '../context/OrderContext';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

const Profile = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const userEmail = localStorage.getItem('userEmail');
  const { orders, deleteOrder } = useOrders();
  const { items: wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [activeTab, setActiveTab] = useState<'orders' | 'wishlist'>('orders');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<{
    orderId: number;
    orderDate: string;
  } | null>(null);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    navigate('/');
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    removeFromWishlist(product.id);
  };

  const handleDeleteOrder = (orderId: number, orderDate: string) => {
    setShowDeleteConfirm({ orderId, orderDate });
  };

  const confirmDeleteOrder = () => {
    if (showDeleteConfirm) {
      deleteOrder(showDeleteConfirm.orderId, showDeleteConfirm.orderDate);
      setShowDeleteConfirm(null);
    }
  };

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-md overflow-hidden"
        >
          {/* Profile Header */}
          <div className="bg-green-600 text-white p-6">
            <div className="flex items-center">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                <User className="w-12 h-12 text-green-600" />
              </div>
              <div className="ml-6">
                <h1 className="text-2xl font-bold">{userEmail}</h1>
                <p className="text-green-100">Member since 2024</p>
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="p-6">
            <div className="flex space-x-4 mb-6">
              <button
                onClick={() => setActiveTab('orders')}
                className={`flex items-center px-4 py-2 rounded-lg ${
                  activeTab === 'orders'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Package className="w-5 h-5 mr-2" />
                My Orders
              </button>
              <button
                onClick={() => setActiveTab('wishlist')}
                className={`flex items-center px-4 py-2 rounded-lg ${
                  activeTab === 'wishlist'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Heart className="w-5 h-5 mr-2" />
                Wishlist
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 ml-auto"
              >
                <LogOut className="w-5 h-5 mr-2" />
                Logout
              </button>
            </div>

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold mb-4">Order History</h2>
                {orders.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No orders yet</p>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order, index) => (
                      <motion.div
                        key={`${order.id}-${index}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="border rounded-lg p-4"
                      >
                        <div className="flex items-center">
                          <img
                            src={order.image}
                            alt={order.name}
                            className="w-16 h-16 object-cover rounded-md"
                          />
                          <div className="ml-4 flex-grow">
                            <h3 className="font-semibold">{order.name}</h3>
                            <p className="text-gray-600">
                              Quantity: {order.quantity} × ${order.price}
                            </p>
                            <p className="text-sm text-gray-500">
                              Ordered on: {new Date(order.orderDate).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className={`px-3 py-1 rounded-full text-sm ${
                              order.status === 'delivered'
                                ? 'bg-green-100 text-green-800'
                                : order.status === 'cancelled'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </span>
                            <button
                              onClick={() => handleDeleteOrder(order.id, order.orderDate)}
                              className="p-2 text-red-500 hover:bg-red-50 rounded-full"
                              title="Delete Order"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Wishlist Tab */}
            {activeTab === 'wishlist' && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold mb-4">My Wishlist</h2>
                {wishlistItems.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">Your wishlist is empty</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {wishlistItems.map((item) => (
                      <div
                        key={item.id}
                        className="border rounded-lg p-4 flex items-center"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-md"
                        />
                        <div className="ml-4 flex-grow">
                          <h3 className="font-semibold">{item.name}</h3>
                          <p className="text-green-600 font-bold">${item.price}</p>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleAddToCart(item)}
                            className="p-2 bg-green-100 text-green-600 rounded-full hover:bg-green-200"
                            title="Add to Cart"
                          >
                            <ShoppingCart className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => removeFromWishlist(item.id)}
                            className="p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200"
                            title="Remove from Wishlist"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50"
              onClick={() => setShowDeleteConfirm(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md relative z-50"
            >
              <h3 className="text-lg font-semibold mb-4">Delete Order</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this order? This action cannot be undone.
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDeleteOrder}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Profile;