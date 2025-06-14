
import React from 'react';
import { Pizza, Facebook, Twitter, Instagram, Phone, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 lg:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center space-x-2 text-2xl font-bold text-orange-400 mb-6">
              <Pizza className="h-8 w-8" />
              <span>Pizza.ke</span>
            </Link>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Kenya's premier pizza directory connecting you with the best local vendors. 
              Discover amazing pizzas, find vendor information, and connect directly with local businesses.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-orange-600 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-orange-600 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-orange-600 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/browse" className="text-gray-300 hover:text-orange-400 transition-colors">
                  Browse Vendors
                </Link>
              </li>
              <li>
                <Link to="/vendors" className="text-gray-300 hover:text-orange-400 transition-colors">
                  All Vendors
                </Link>
              </li>
              <li>
                <Link to="/blogs" className="text-gray-300 hover:text-orange-400 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-orange-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-orange-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* For Vendors */}
          <div>
            <h3 className="text-lg font-semibold mb-6">For Vendors</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/vendor/register" className="text-gray-300 hover:text-orange-400 transition-colors">
                  List Your Business
                </Link>
              </li>
              <li>
                <Link to="/vendor/dashboard" className="text-gray-300 hover:text-orange-400 transition-colors">
                  Vendor Dashboard
                </Link>
              </li>
              <li>
                <Link to="/vendor/help" className="text-gray-300 hover:text-orange-400 transition-colors">
                  Vendor Support
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-300 hover:text-orange-400 transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Get in Touch</h3>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-orange-400" />
                <span className="text-gray-300">+254 700 123 456</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-orange-400" />
                <span className="text-gray-300">hello@pizza.ke</span>
              </li>
              <li className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-orange-400" />
                <span className="text-gray-300">Nairobi, Kenya</span>
              </li>
            </ul>

            {/* App Download */}
            <div className="mt-8">
              <h4 className="font-semibold mb-4">Download Our App</h4>
              <div className="flex space-x-3">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" 
                  alt="Get it on Google Play" 
                  className="h-10 cursor-pointer hover:opacity-80 transition-opacity"
                />
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" 
                  alt="Download on the App Store" 
                  className="h-10 cursor-pointer hover:opacity-80 transition-opacity"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 Pizza.ke. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-gray-400 hover:text-orange-400 text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-400 hover:text-orange-400 text-sm transition-colors">
              Terms of Service
            </Link>
            <Link to="/cookies" className="text-gray-400 hover:text-orange-400 text-sm transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
