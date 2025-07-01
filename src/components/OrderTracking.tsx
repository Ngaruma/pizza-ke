
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, MapPin, Truck, CheckCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface Order {
  id: string;
  status: string;
  total_amount: number;
  delivery_address: string;
  estimated_delivery: string;
  created_at: string;
  vendor: {
    business_name: string;
  };
  order_items: Array<{
    quantity: number;
    pizza: {
      name: string;
    };
  }>;
}

export function OrderTracking() {
  const [activeOrders, setActiveOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const fetchActiveOrders = async () => {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          vendor:vendors(business_name),
          order_items(
            quantity,
            pizza:pizzas(name)
          )
        `)
        .eq('customer_id', user.id)
        .in('status', ['pending', 'preparing', 'ready'])
        .order('created_at', { ascending: false });

      if (!error && data) {
        setActiveOrders(data);
      }
      setLoading(false);
    };

    fetchActiveOrders();

    // Subscribe to real-time order updates
    const channel = supabase
      .channel('order-updates')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'orders',
          filter: `customer_id=eq.${user.id}`,
        },
        (payload) => {
          setActiveOrders(prev => 
            prev.map(order => 
              order.id === payload.new.id 
                ? { ...order, ...payload.new }
                : order
            )
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'preparing': return <Truck className="h-4 w-4" />;
      case 'ready': return <CheckCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'preparing': return 'bg-blue-100 text-blue-800';
      case 'ready': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!user) {
    return null;
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading your orders...</p>
        </CardContent>
      </Card>
    );
  }

  if (activeOrders.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-gray-600">No active orders</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Order Tracking</h2>
      {activeOrders.map((order) => (
        <Card key={order.id}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">
                Order #{order.id.slice(0, 8)}
              </CardTitle>
              <Badge className={getStatusColor(order.status)}>
                {getStatusIcon(order.status)}
                <span className="ml-1 capitalize">{order.status}</span>
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span className="text-sm">{order.vendor.business_name}</span>
              </div>
              <div className="text-sm text-gray-600">
                {order.order_items.map((item, idx) => (
                  <span key={idx}>
                    {item.quantity}x {item.pizza.name}
                    {idx < order.order_items.length - 1 ? ', ' : ''}
                  </span>
                ))}
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold">KSh {order.total_amount}</span>
                {order.estimated_delivery && (
                  <span className="text-sm text-gray-500">
                    Est. delivery: {new Date(order.estimated_delivery).toLocaleTimeString()}
                  </span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
