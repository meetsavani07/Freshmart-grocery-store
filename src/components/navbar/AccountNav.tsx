import { Link } from 'react-router-dom';
import { ShoppingCart, User, LogOut } from 'lucide-react';

interface AccountNavProps {
  isLoggedIn: boolean;
  handleLogout: () => void;
}

const AccountNav = ({ isLoggedIn, handleLogout }: AccountNavProps) => (
  <div className="hidden md:flex items-center space-x-4">
    <Link to="/cart" className="hover:bg-green-700 px-3 py-2 rounded-md">
      <ShoppingCart className="inline-block" />
    </Link>
    {isLoggedIn ? (
      <>
        <Link to="/profile" className="hover:bg-green-700 px-3 py-2 rounded-md">
          <User className="inline-block" />
        </Link>
        <button
          onClick={handleLogout}
          className="hover:bg-green-700 px-3 py-2 rounded-md flex items-center"
        >
          <LogOut className="inline-block" />
          <span className="ml-2">Logout</span>
        </button>
      </>
    ) : (
      <Link to="/login" className="hover:bg-green-700 px-3 py-2 rounded-md">
        Login
      </Link>
    )}
  </div>
);

export default AccountNav;