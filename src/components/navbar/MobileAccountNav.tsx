import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface MobileAccountNavProps {
  isLoggedIn: boolean;
  handleLogout: () => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const MobileAccountNav = ({ isLoggedIn, handleLogout, isOpen, setIsOpen }: MobileAccountNavProps) => (
  isOpen && (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="md:hidden border-t border-green-700 mt-2 pt-2"
    >
      <Link 
        to="/cart" 
        className="block hover:bg-green-700 px-3 py-2 rounded-md"
        onClick={() => setIsOpen(false)}
      >
        Cart
      </Link>
      {isLoggedIn ? (
        <>
          <Link 
            to="/profile" 
            className="block hover:bg-green-700 px-3 py-2 rounded-md"
            onClick={() => setIsOpen(false)}
          >
            Profile
          </Link>
          <button
            onClick={() => {
              handleLogout();
              setIsOpen(false);
            }}
            className="block w-full text-left hover:bg-green-700 px-3 py-2 rounded-md"
          >
            Logout
          </button>
        </>
      ) : (
        <Link 
          to="/login" 
          className="block hover:bg-green-700 px-3 py-2 rounded-md"
          onClick={() => setIsOpen(false)}
        >
          Login
        </Link>
      )}
    </motion.div>
  )
);

export default MobileAccountNav;