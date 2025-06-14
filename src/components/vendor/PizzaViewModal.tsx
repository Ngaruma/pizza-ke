import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Pizza, Clock, Star, ExternalLink } from 'lucide-react';

interface PizzaViewModalProps {
  pizza: any;
  onClose: () => void;
}

export const PizzaViewModal: React.FC<PizzaViewModalProps> = ({ pizza, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            {pizza.name}
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-center">
            {pizza.image_url ? (
              <img 
                src={pizza.image_url} 
                alt={pizza.name}
                className="w-48 h-48 object-cover rounded-lg"
              />
            ) : (
              <div className="w-48 h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                <Pizza className="h-16 w-16 text-gray-400" />
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">KSh {pizza.base_price}</div>
              <div className="text-sm text-gray-600">Base Price</div>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-center text-2xl font-bold text-blue-600">
                <Clock className="h-5 w-5 mr-1" />
                {pizza.preparation_time}m
              </div>
              <div className="text-sm text-gray-600">Prep Time</div>
            </div>
          </div>

          <div className="flex items-center justify-center space-x-4">
            <Badge className={pizza.is_available ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
              {pizza.is_available ? 'Available' : 'Unavailable'}
            </Badge>
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-500 mr-1" />
              <span className="font-semibold">{pizza.rating?.toFixed(1) || '0.0'}</span>
              <span className="text-gray-500 ml-1">({pizza.total_reviews} reviews)</span>
            </div>
          </div>

          {pizza.description && (
            <div>
              <h4 className="font-semibold mb-2">Description</h4>
              <p className="text-gray-700">{pizza.description}</p>
            </div>
          )}

          {pizza.sizes && pizza.sizes.length > 0 && (
            <div>
              <h4 className="font-semibold mb-3">Available Sizes</h4>
              <div className="grid grid-cols-2 gap-2">
                {pizza.sizes.map((size: any, index: number) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="font-medium">{size.name}</div>
                    <div className="text-sm text-gray-600">
                      {size.price_modifier === 0 
                        ? 'Base price' 
                        : `${size.price_modifier > 0 ? '+' : ''}KSh ${size.price_modifier}`
                      }
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {pizza.toppings && pizza.toppings.length > 0 && (
            <div>
              <h4 className="font-semibold mb-3">Available Toppings</h4>
              <div className="grid grid-cols-2 gap-2">
                {pizza.toppings.map((topping: any, index: number) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="font-medium">{topping.name}</div>
                    <div className="text-sm text-gray-600">+KSh {topping.price}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {pizza.external_url && (
            <div className="text-center">
              <Button 
                asChild 
                className="bg-orange-600 hover:bg-orange-700"
              >
                <a 
                  href={pizza.external_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Order on Vendor's Website
                </a>
              </Button>
              <p className="text-sm text-gray-500 mt-2">
                Complete your purchase directly with the vendor
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
