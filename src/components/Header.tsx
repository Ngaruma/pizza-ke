
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Pizza, User, LogOut, Settings, ShoppingCart, MessageSquare } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { AIChat } from './AIChat';

export function Header() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [showAIChat, setShowAIChat] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Pizza className="h-8 w-8 text-orange-600" />
            <span className="text-2xl font-bold text-gray-900">Pizza.ke</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-orange-600 transition-colors">
              Home
            </Link>
            <Link to="/browse" className="text-gray-700 hover:text-orange-600 transition-colors">
              Browse
            </Link>
            <Link to="/vendors" className="text-gray-700 hover:text-orange-600 transition-colors">
              Restaurants
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-orange-600 transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-orange-600 transition-colors">
              Contact
            </Link>
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* AI Chat Button */}
            {user && (
              <Dialog open={showAIChat} onOpenChange={setShowAIChat}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    AI Help
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <AIChat />
                </DialogContent>
              </Dialog>
            )}

            {user ? (
              <div className="flex items-center space-x-4">
                {/* Orders link */}
                <Link to="/orders">
                  <Button variant="outline" size="sm">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Orders
                  </Button>
                </Link>

                {/* User dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <User className="h-4 w-4 mr-2" />
                      Account
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link to="/profile">
                        <User className="h-4 w-4 mr-2" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/orders">
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        My Orders
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/vendor/dashboard">
                        <Settings className="h-4 w-4 mr-2" />
                        Vendor Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/auth">
                  <Button variant="outline" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link to="/auth">
                  <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
