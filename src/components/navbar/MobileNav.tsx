import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface MobileNavProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const MobileNav = ({ isOpen, setIsOpen }: MobileNavProps) => (
  isOpen && (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="md:hidden fixed inset-0 top-16 bg-green-600 z-40"
    >
      <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 overflow-y-auto max-h-[calc(100vh-4rem)]">
        <Link 
          to="/" 
          className="block hover:bg-green-700 px-3 py-2 rounded-md"
          onClick={() => setIsOpen(false)}
        >
          Home
        </Link>
        <Link 
          to="/shop" 
          className="block hover:bg-green-700 px-3 py-2 rounded-md"
          onClick={() => setIsOpen(false)}
        >
          Shop
        </Link>
        <Link 
          to="/recipes" 
          className="block hover:bg-green-700 px-3 py-2 rounded-md"
          onClick={() => setIsOpen(false)}
        >
          Recipes
        </Link>
        <Link 
          to="/blog" 
          className="block hover:bg-green-700 px-3 py-2 rounded-md"
          onClick={() => setIsOpen(false)}
        >
          Blog
        </Link>
        <Link 
          to="/rewards" 
          className="block hover:bg-green-700 px-3 py-2 rounded-md"
          onClick={() => setIsOpen(false)}
        >
          Rewards
        </Link>
        <Link 
          to="/faq" 
          className="block hover:bg-green-700 px-3 py-2 rounded-md"
          onClick={() => setIsOpen(false)}
        >
          Help
        </Link>
        <Link 
          to="/about" 
          className="block hover:bg-green-700 px-3 py-2 rounded-md"
          onClick={() => setIsOpen(false)}
        >
          About
        </Link>
        <Link 
          to="/contact" 
          className="block hover:bg-green-700 px-3 py-2 rounded-md"
          onClick={() => setIsOpen(false)}
        >
          Contact
        </Link>
      </div>
    </motion.div>
  )
);

export default MobileNav;