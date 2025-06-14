
import React from 'react';
import { Star, Clock, MapPin, Plus, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface Pizza {
  id: string;
  name: string;
  description: string;
  image_url: string;
  base_price: number;
  rating: number;
  total_reviews: number;
  preparation_time: number;
  external_url?: string;
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

interface PizzaCardProps {
  pizza: Pizza;
}

export function PizzaCard({ pizza }: PizzaCardProps) {
  const fallbackImage = '/placeholder.svg';

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="relative overflow-hidden">
        <img
          src={pizza.image_url || fallbackImage}
          alt={pizza.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = fallbackImage;
          }}
        />
        <div className="absolute top-2 left-2">
          <span className="bg-orange-600 text-white px-2 py-1 rounded-full text-xs font-medium">
            {pizza.category?.name || 'Pizza'}
          </span>
        </div>
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
          <div className="flex items-center space-x-1">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-medium">
              {pizza.rating ? pizza.rating.toFixed(1) : '4.5'}
            </span>
          </div>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="mb-2">
          <h3 className="font-semibold text-lg text-gray-900 mb-1 line-clamp-1">
            {pizza.name}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-2 mb-2">
            {pizza.description || 'Delicious pizza made with fresh ingredients'}
          </p>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
          <div className="flex items-center space-x-1">
            <MapPin className="h-3 w-3" />
            <span className="line-clamp-1">{pizza.vendor?.business_name}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="h-3 w-3" />
            <span>{pizza.preparation_time || 20} min</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <span>
            {pizza.total_reviews || 0} review{pizza.total_reviews !== 1 ? 's' : ''}
          </span>
          <span>
            Delivery: KSh {pizza.vendor?.delivery_fee || 0}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-orange-600">
              KSh {pizza.base_price.toLocaleString()}
            </span>
            <span className="text-sm text-gray-500 ml-1">from</span>
          </div>
          <div className="flex items-center space-x-2">
            <Link to={`/pizza/${pizza.id}`}>
              <Button variant="outline" size="sm">
                View
              </Button>
            </Link>
            {pizza.external_url ? (
              <Button 
                asChild 
                size="sm" 
                className="bg-orange-600 hover:bg-orange-700"
              >
                <a 
                  href={pizza.external_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="h-4 w-4 mr-1" />
                  Order
                </a>
              </Button>
            ) : (
              <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                <Plus className="h-4 w-4 mr-1" />
                Add
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
