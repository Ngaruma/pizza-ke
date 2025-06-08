
import React, { useState, useEffect } from 'react';
import { Search, Filter, Star, Clock, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { PizzaCard } from '@/components/PizzaCard';
import { PizzaFilters } from '@/components/PizzaFilters';

interface Pizza {
  id: string;
  name: string;
  description: string;
  image_url: string;
  base_price: number;
  rating: number;
  total_reviews: number;
  preparation_time: number;
  vendor: {
    business_name: string;
    city: string;
    delivery_fee: number;
    delivery_time_min: number;
    delivery_time_max: number;
  };
  category: {
    name: string;
  };
}

const Browse = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [showFilters, setShowFilters] = useState(false);

  const { data: pizzas = [], isLoading } = useQuery({
    queryKey: ['pizzas', searchTerm, selectedCategory, priceRange, sortBy],
    queryFn: async () => {
      let query = supabase
        .from('pizzas')
        .select(`
          *,
          vendor:vendors(business_name, city, delivery_fee, delivery_time_min, delivery_time_max),
          category:pizza_categories(name)
        `)
        .eq('is_available', true);

      if (searchTerm) {
        query = query.ilike('name', `%${searchTerm}%`);
      }

      if (selectedCategory !== 'all') {
        query = query.eq('category.name', selectedCategory);
      }

      if (priceRange !== 'all') {
        const [min, max] = priceRange.split('-').map(Number);
        if (max) {
          query = query.gte('base_price', min).lte('base_price', max);
        } else {
          query = query.gte('base_price', min);
        }
      }

      if (sortBy === 'price_low') {
        query = query.order('base_price', { ascending: true });
      } else if (sortBy === 'price_high') {
        query = query.order('base_price', { ascending: false });
      } else if (sortBy === 'rating') {
        query = query.order('rating', { ascending: false });
      } else {
        query = query.order('total_reviews', { ascending: false });
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as Pizza[];
    },
  });

  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('pizza_categories')
        .select('*')
        .order('name');
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Discover Amazing Pizzas
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              From traditional classics to gourmet creations, find your perfect slice
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search for pizzas, vendors, or ingredients..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 pr-4 py-4 text-lg rounded-full border-0 focus:ring-2 focus:ring-white/20"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <div className="lg:hidden mb-4">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="w-full"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
            
            <div className={`lg:block ${showFilters ? 'block' : 'hidden'}`}>
              <PizzaFilters
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                priceRange={priceRange}
                onPriceRangeChange={setPriceRange}
                sortBy={sortBy}
                onSortByChange={setSortBy}
              />
            </div>
          </div>

          {/* Results */}
          <div className="lg:w-3/4">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {searchTerm ? `Results for "${searchTerm}"` : 'All Pizzas'}
                </h2>
                <p className="text-gray-600">
                  {isLoading ? 'Loading...' : `${pizzas.length} pizzas found`}
                </p>
              </div>
              
              <div className="mt-4 sm:mt-0">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popular">Most Popular</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="price_low">Price: Low to High</SelectItem>
                    <SelectItem value="price_high">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Pizza Grid */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-gray-200 rounded-lg h-64 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </div>
                ))}
              </div>
            ) : pizzas.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {pizzas.map((pizza) => (
                  <PizzaCard key={pizza.id} pizza={pizza} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Search className="h-16 w-16 mx-auto mb-4" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No pizzas found
                </h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search or filters to find what you're looking for.
                </p>
                <Button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                    setPriceRange('all');
                  }}
                  variant="outline"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Browse;
