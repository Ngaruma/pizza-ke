import React from 'react';
import { ArrowRight, Star, Clock, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
export function Hero() {
  return <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent z-10"></div>
        <img src="https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" alt="Delicious Pizza" className="w-full h-full object-cover" />
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 lg:px-6">
        <div className="max-w-4xl">
          <div className="mb-6 flex items-center space-x-2 text-orange-400">
            <Star className="h-5 w-5 fill-current" />
            <span className="text-sm font-medium">Kenya's #1 Pizza Marketplace</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Pizza Delivered
            <span className="block text-orange-400">Fresh & Fast</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl leading-relaxed">
            Discover amazing pizzas from the best local vendors. Fresh ingredients, 
            authentic flavors, delivered right to your door.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Link to="/browse">
              <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group">
                Order Now
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/vendors">
              <Button variant="outline" size="lg" className="border-2 border-white px-8 py-4 text-lg font-semibold rounded-full backdrop-blur-sm text-white bg-red-600 hover:bg-red-500">
                Become a Vendor
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-white">
            <div className="flex items-center space-x-3">
              <div className="bg-orange-600 p-3 rounded-full">
                <Clock className="h-6 w-6" />
              </div>
              <div>
                <div className="text-2xl font-bold">30 min</div>
                <div className="text-sm text-gray-300">Average Delivery</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="bg-orange-600 p-3 rounded-full">
                <Star className="h-6 w-6" />
              </div>
              <div>
                <div className="text-2xl font-bold">4.8★</div>
                <div className="text-sm text-gray-300">Customer Rating</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="bg-orange-600 p-3 rounded-full">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <div className="text-2xl font-bold">50+</div>
                <div className="text-sm text-gray-300">Locations</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>;
}