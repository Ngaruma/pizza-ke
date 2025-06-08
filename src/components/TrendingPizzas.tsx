
import React, { useEffect, useState } from 'react';
import { Star, Plus } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Pizza {
  id: string;
  name: string;
  description: string;
  image_url: string;
  base_price: number;
  rating: number;
  total_reviews: number;
  vendor: {
    business_name: string;
  };
}

export function TrendingPizzas() {
  const [pizzas, setPizzas] = useState<Pizza[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrendingPizzas();
  }, []);

  const fetchTrendingPizzas = async () => {
    try {
      const { data, error } = await supabase
        .from('pizzas')
        .select(`
          *,
          vendor:vendors(business_name)
        `)
        .eq('is_available', true)
        .order('rating', { ascending: false })
        .limit(8);

      if (error) throw error;
      setPizzas(data || []);
    } catch (error) {
      console.error('Error fetching pizzas:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Trending Pizzas
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The most popular pizzas ordered this week
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <div className="aspect-square bg-gray-300"></div>
                <CardContent className="p-4">
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded mb-4"></div>
                  <div className="h-6 bg-gray-300 rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Trending Pizzas
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            The most popular pizzas ordered this week
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pizzas.map((pizza) => (
            <Card key={pizza.id} className="group hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden border-0">
              <div className="relative aspect-square overflow-hidden">
                <img 
                  src={pizza.image_url || 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'}
                  alt={pizza.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Button 
                  size="sm"
                  className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 bg-orange-600 hover:bg-orange-700 rounded-full w-10 h-10 p-0"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <CardContent className="p-4">
                <div className="mb-2">
                  <h3 className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
                    {pizza.name}
                  </h3>
                  <p className="text-sm text-gray-500">{pizza.vendor?.business_name}</p>
                </div>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {pizza.description || 'Delicious pizza with premium ingredients'}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">
                      {pizza.rating?.toFixed(1) || '4.5'}
                    </span>
                    <span className="text-xs text-gray-500">
                      ({pizza.total_reviews || 0})
                    </span>
                  </div>
                  <span className="text-lg font-bold text-orange-600">
                    KSh {pizza.base_price}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
