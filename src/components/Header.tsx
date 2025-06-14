
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, Pizza } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-orange-100 shadow-sm">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 text-2xl font-bold text-orange-600">
            <Pizza className="h-8 w-8" />
            <span>Pizza.ke</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/browse" className="text-gray-700 hover:text-orange-600 transition-colors font-medium">
              Browse
            </Link>
            <Link to="/vendors" className="text-gray-700 hover:text-orange-600 transition-colors font-medium">
              Vendors
            </Link>
            <Link to="/blogs" className="text-gray-700 hover:text-orange-600 transition-colors font-medium">
              Blog
            </Link>
            {user ? (
              <div className="flex items-center space-x-4">
                <Link to="/cart" className="relative p-2 text-gray-700 hover:text-orange-600 transition-colors">
                  <ShoppingCart className="h-6 w-6" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    0
                  </span>
                </Link>
                <div className="relative group">
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <User className="h-5 w-5" />
                    <span>Account</span>
                  </Button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200">
                    <div className="py-1">
                      <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50">
                        Profile
                      </Link>
                      <Link to="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50">
                        My Orders
                      </Link>
                      <Link to="/vendor/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50">
                        Vendor Dashboard
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-orange-50"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/auth">
                  <Button variant="ghost">Sign In</Button>
                </Link>
                <Link to="/auth">
                  <Button className="bg-orange-600 hover:bg-orange-700">Get Started</Button>
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute left-0 right-0 top-16 bg-white border-b border-gray-200 shadow-lg">
            <nav className="flex flex-col space-y-1 px-4 py-4">
              <Link to="/browse" className="py-2 text-gray-700 hover:text-orange-600 transition-colors">
                Browse
              </Link>
              <Link to="/vendors" className="py-2 text-gray-700 hover:text-orange-600 transition-colors">
                Vendors
              </Link>
              <Link to="/blogs" className="py-2 text-gray-700 hover:text-orange-600 transition-colors">
                Blog
              </Link>
              {user ? (
                <>
                  <Link to="/cart" className="py-2 text-gray-700 hover:text-orange-600 transition-colors">
                    Cart
                  </Link>
                  <Link to="/profile" className="py-2 text-gray-700 hover:text-orange-600 transition-colors">
                    Profile
                  </Link>
                  <Link to="/orders" className="py-2 text-gray-700 hover:text-orange-600 transition-colors">
                    My Orders
                  </Link>
                  <Link to="/vendor/dashboard" className="py-2 text-gray-700 hover:text-orange-600 transition-colors">
                    Vendor Dashboard
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="py-2 text-left text-gray-700 hover:text-orange-600 transition-colors"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link to="/auth" className="py-2 text-gray-700 hover:text-orange-600 transition-colors">
                    Sign In
                  </Link>
                  <Link to="/auth" className="py-2 text-orange-600 font-medium">
                    Get Started
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
