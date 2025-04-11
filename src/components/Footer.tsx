import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Facebook, Twitter, Instagram, Linkedin, CreditCard } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-green-800 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">FreshMart</h3>
            <p className="text-sm text-gray-300 mb-4">
              Your trusted partner for fresh, quality groceries delivered to your doorstep.
            </p>
            <div className="space-y-2">
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                <span className="text-sm">contact@freshmart.com</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                <span className="text-sm">123 Grocery Street, NY 10001</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/shop" className="text-sm hover:text-green-300">Shop Now</Link>
              </li>
              <li>
                <Link to="/recipes" className="text-sm hover:text-green-300">Recipes</Link>
              </li>
              <li>
                <Link to="/blog" className="text-sm hover:text-green-300">Blog</Link>
              </li>
              <li>
                <Link to="/about" className="text-sm hover:text-green-300">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm hover:text-green-300">Contact</Link>
              </li>
              <li>
                <Link to="/faq" className="text-sm hover:text-green-300">FAQ</Link>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Account</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/login" className="text-sm hover:text-green-300">Login</Link>
              </li>
              <li>
                <Link to="/register" className="text-sm hover:text-green-300">Register</Link>
              </li>
              <li>
                <Link to="/profile" className="text-sm hover:text-green-300">My Account</Link>
              </li>
              <li>
                <Link to="/cart" className="text-sm hover:text-green-300">My Cart</Link>
              </li>
              <li>
                <Link to="/rewards" className="text-sm hover:text-green-300">Rewards</Link>
              </li>
            </ul>
          </div>

          {/* Newsletter & Social */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Stay Connected</h3>
            <div className="mb-4">
              <p className="text-sm mb-2">Subscribe to our newsletter</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-3 py-2 text-gray-900 rounded-l-md w-full"
                />
                <button className="bg-green-600 px-4 py-2 rounded-r-md hover:bg-green-700">
                  Subscribe
                </button>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-2">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-green-300">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="hover:text-green-300">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="hover:text-green-300">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="hover:text-green-300">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Methods & Bottom Links */}
        <div className="mt-8 pt-8 border-t border-green-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm">© 2024 FreshMart. All rights reserved.</p>
            </div>
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
              <div className="flex items-center space-x-2">
                <span className="text-sm">Payment Methods:</span>
                <CreditCard className="w-8 h-8" />
                <img src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_37x23.jpg" alt="PayPal" className="h-6" />
                <img src="https://www.mastercard.us/content/dam/public/mastercardcom/na/us/en/homepage/Home/mc-logo-52.svg" alt="Mastercard" className="h-6" />
                <img src="https://www.visa.com/images/visa-logo.png" alt="Visa" className="h-6" />
              </div>
              <div className="flex space-x-4">
                <Link to="/terms" className="text-sm hover:text-green-300">Terms</Link>
                <Link to="/privacy" className="text-sm hover:text-green-300">Privacy</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;