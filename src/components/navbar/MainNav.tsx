import { Link } from 'react-router-dom';

const MainNav = () => (
  <div className="hidden md:block">
    <div className="ml-10 flex items-center space-x-4">
      <Link to="/" className="hover:bg-green-700 px-3 py-2 rounded-md">Home</Link>
      <Link to="/shop" className="hover:bg-green-700 px-3 py-2 rounded-md">Shop</Link>
      <Link to="/recipes" className="hover:bg-green-700 px-3 py-2 rounded-md">Recipes</Link>
      <Link to="/blog" className="hover:bg-green-700 px-3 py-2 rounded-md">Blog</Link>
      <Link to="/rewards" className="hover:bg-green-700 px-3 py-2 rounded-md">Rewards</Link>
      <Link to="/faq" className="hover:bg-green-700 px-3 py-2 rounded-md">Help</Link>
      <Link to="/about" className="hover:bg-green-700 px-3 py-2 rounded-md">About</Link>
      <Link to="/contact" className="hover:bg-green-700 px-3 py-2 rounded-md">Contact</Link>
    </div>
  </div>
);

export default MainNav;