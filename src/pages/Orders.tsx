
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Package, Clock, MapPin } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { formatDistanceToNow } from 'date-fns';
import { Link } from 'react-router-dom';

export default function Orders() {
  const { user } = useAuth();

  // Fetch user orders
  const { data: orders, isLoading } = useQuery({
    queryKey: ['user-orders', user?.id],
    queryFn: async () => {
      if (!user) throw new Error('No user found');
      
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (
            *,
            pizza:pizzas(name, image_url)
          ),
          vendor:vendors(business_name)
        `)
        .eq('customer_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'preparing': return 'bg-blue-100 text-blue-800';
      case 'ready': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-gray-600">
            Please <Link to="/auth" className="text-orange-600 hover:underline">sign in</Link> to view your orders.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Orders</h1>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Order History
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8">Loading orders...</div>
            ) : orders?.length === 0 ? (
              <div className="text-center py-8 text-gray-600">
                <Package className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p>No orders yet. <Link to="/browse" className="text-orange-600 hover:underline">Start browsing our delicious pizzas!</Link></p>
              </div>
            ) : (
              <div className="space-y-4">
                {orders?.map((order) => (
                  <div key={order.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold">Order #{order.id.slice(0, 8)}</h3>
                        <p className="text-sm text-gray-600 flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {formatDistanceToNow(new Date(order.created_at))} ago
                        </p>
                        <p className="text-sm text-gray-600 flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {order.vendor?.business_name}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge className={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                        <p className="font-semibold mt-1">KSh {order.total_amount}</p>
                      </div>
                    </div>

                    <div className="border-t pt-3">
                      <h4 className="font-medium mb-2">Items:</h4>
                      {order.order_items?.map((item: any, idx: number) => (
                        <div key={idx} className="flex items-center gap-3 py-2">
                          {item.pizza?.image_url && (
                            <img 
                              src={item.pizza.image_url} 
                              alt={item.pizza.name}
                              className="w-12 h-12 rounded object-cover"
                            />
                          )}
                          <div className="flex-1">
                            <p className="font-medium">{item.pizza?.name}</p>
                            <p className="text-sm text-gray-600">
                              Quantity: {item.quantity} × KSh {item.unit_price}
                            </p>
                          </div>
                          <p className="font-medium">KSh {item.total_price}</p>
                        </div>
                      ))}
                    </div>

                    <div className="border-t pt-3 mt-3">
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Delivery Address:</span>
                        <span>{order.delivery_address}</span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Payment Status:</span>
                        <span className="capitalize">{order.payment_status}</span>
                      </div>
                      {order.delivery_notes && (
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>Delivery Notes:</span>
                          <span>{order.delivery_notes}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
