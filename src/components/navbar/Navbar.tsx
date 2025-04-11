import { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import MainNav from './MainNav';
import MobileNav from './MobileNav';
import AccountNav from './AccountNav';
import MobileAccountNav from './MobileAccountNav';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    navigate('/');
    setIsOpen(false);
  };

  return (
    <nav className="bg-green-600 text-white fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-shrink-0"
          >
            <Link 
              to="/" 
              className="text-2xl font-bold"
              onClick={() => setIsOpen(false)}
            >
              FreshMart
            </Link>
          </motion.div>

          <MainNav />
          <AccountNav isLoggedIn={isLoggedIn} handleLogout={handleLogout} />

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md hover:bg-green-700"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <MobileNav isOpen={isOpen} setIsOpen={setIsOpen} />
      <MobileAccountNav 
        isLoggedIn={isLoggedIn} 
        handleLogout={handleLogout} 
        isOpen={isOpen} 
        setIsOpen={setIsOpen}
      />
    </nav>
  );
};

export default Navbar;