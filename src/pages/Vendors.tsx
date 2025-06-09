
import React, { useEffect, useState } from 'react';
import { Star, Clock, MapPin, Phone, Mail } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface Vendor {
  id: string;
  business_name: string;
  description: string;
  logo_url: string;
  banner_url: string;
  rating: number;
  total_reviews: number;
  delivery_time_min: number;
  delivery_time_max: number;
  delivery_fee: number;
  badges: string[];
  city: string;
  phone: string;
  email: string;
  address: string;
}

export default function Vendors() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    try {
      const { data, error } = await supabase
        .from('vendors')
        .select('*')
        .eq('is_approved', true)
        .eq('is_active', true)
        .order('rating', { ascending: false });

      if (error) throw error;
      setVendors(data || []);
    } catch (error) {
      console.error('Error fetching vendors:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredVendors = vendors.filter(vendor => {
    const matchesSearch = vendor.business_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vendor.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCity = !selectedCity || vendor.city === selectedCity;
    return matchesSearch && matchesCity;
  });

  const cities = [...new Set(vendors.map(vendor => vendor.city).filter(Boolean))];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Pizza Vendors</h1>
            <p className="text-lg text-gray-600">Discover amazing pizza places near you</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <div className="h-48 bg-gray-300"></div>
                <CardContent className="p-6">
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded mb-4"></div>
                  <div className="flex space-x-2">
                    <div className="h-6 bg-gray-300 rounded w-16"></div>
                    <div className="h-6 bg-gray-300 rounded w-20"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Pizza Vendors</h1>
          <p className="text-xl mb-8">Discover amazing pizza places and support local businesses</p>
          
          {/* Search and Filters */}
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search vendors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-300"
                />
              </div>
              <div className="md:w-48">
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-300"
                >
                  <option value="">All Cities</option>
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Vendors Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredVendors.length} vendor{filteredVendors.length !== 1 ? 's' : ''}
            {searchTerm && ` for "${searchTerm}"`}
            {selectedCity && ` in ${selectedCity}`}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVendors.map((vendor) => (
            <Card key={vendor.id} className="group hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden border-0 bg-white">
              {/* Banner Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={vendor.banner_url || 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'}
                  alt={vendor.business_name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                
                {/* Logo */}
                <div className="absolute bottom-4 left-4">
                  <div className="w-16 h-16 rounded-full bg-white p-2 shadow-lg">
                    {vendor.logo_url ? (
                      <img 
                        src={vendor.logo_url} 
                        alt={vendor.business_name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white text-xl font-bold">
                        {vendor.business_name.charAt(0)}
                      </div>
                    )}
                  </div>
                </div>

                {/* Badges */}
                <div className="absolute top-4 right-4 flex flex-col gap-1">
                  {vendor.badges?.map((badge, index) => (
                    <Badge key={index} className="bg-orange-600 text-white">
                      {badge}
                    </Badge>
                  ))}
                </div>
              </div>

              <CardContent className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                    {vendor.business_name}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {vendor.description || 'Delicious pizzas made with love and premium ingredients'}
                  </p>
                </div>

                {/* Rating and Reviews */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-900">
                      {vendor.rating?.toFixed(1) || '4.5'}
                    </span>
                    <span className="text-sm text-gray-500">
                      ({vendor.total_reviews || 0} reviews)
                    </span>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-500">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">
                      {vendor.delivery_time_min}-{vendor.delivery_time_max} min
                    </span>
                  </div>
                </div>

                {/* Location and Contact */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">{vendor.city || 'Nairobi'}</span>
                  </div>
                  {vendor.phone && (
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Phone className="h-4 w-4" />
                      <span className="text-sm">{vendor.phone}</span>
                    </div>
                  )}
                  {vendor.email && (
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Mail className="h-4 w-4" />
                      <span className="text-sm">{vendor.email}</span>
                    </div>
                  )}
                </div>

                {/* Delivery Fee */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-600">Delivery Fee:</span>
                  <span className="text-sm font-medium text-gray-900">
                    {vendor.delivery_fee === 0 ? 'Free' : `KSh ${vendor.delivery_fee}`}
                  </span>
                </div>

                {/* View Menu Button */}
                <Button className="w-full bg-orange-600 hover:bg-orange-700">
                  View Menu
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredVendors.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🍕</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No vendors found</h3>
            <p className="text-gray-600">
              {searchTerm || selectedCity 
                ? 'Try adjusting your search criteria' 
                : 'No vendors are currently available'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
