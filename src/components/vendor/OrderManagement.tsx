
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useUpdateOrderStatus } from '@/hooks/useVendorData';
import { formatDistanceToNow } from 'date-fns';

interface OrderManagementProps {
  orders: any[];
}

export const OrderManagement: React.FC<OrderManagementProps> = ({ orders }) => {
  const updateOrderStatus = useUpdateOrderStatus();

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

  const handleStatusChange = (orderId: string, newStatus: string) => {
    updateOrderStatus.mutate({ orderId, status: newStatus });
  };

  const getNextStatus = (currentStatus: string) => {
    switch (currentStatus) {
      case 'pending': return 'preparing';
      case 'preparing': return 'ready';
      case 'ready': return 'delivered';
      default: return null;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return 'Accept Order';
      case 'preparing': return 'Mark Ready';
      case 'ready': return 'Mark Delivered';
      default: return null;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Management</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {orders?.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No orders yet. Start promoting your pizzas!
            </div>
          ) : (
            orders?.map((order) => (
              <div key={order.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-semibold">Order #{order.id.slice(0, 8)}</h3>
                    <p className="text-sm text-muted-foreground">
                      {formatDistanceToNow(new Date(order.created_at))} ago
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(order.status)}>
                      {order.status}
                    </Badge>
                    <span className="font-semibold">KSh {order.total_amount}</span>
                  </div>
                </div>

                <div className="mb-3">
                  <p className="text-sm"><strong>Delivery Address:</strong> {order.delivery_address}</p>
                  <p className="text-sm"><strong>Payment:</strong> {order.payment_status}</p>
                </div>

                <div className="mb-3">
                  <h4 className="font-medium mb-2">Items:</h4>
                  {order.order_items?.map((item: any, idx: number) => (
                    <div key={idx} className="text-sm text-muted-foreground">
                      {item.quantity}x {item.pizza?.name} - KSh {item.total_price}
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  {getNextStatus(order.status) && (
                    <Button
                      onClick={() => handleStatusChange(order.id, getNextStatus(order.status)!)}
                      disabled={updateOrderStatus.isPending}
                      size="sm"
                    >
                      {getStatusLabel(order.status)}
                    </Button>
                  )}
                  {order.status !== 'cancelled' && order.status !== 'delivered' && (
                    <Button
                      variant="destructive"
                      onClick={() => handleStatusChange(order.id, 'cancelled')}
                      disabled={updateOrderStatus.isPending}
                      size="sm"
                    >
                      Cancel Order
                    </Button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};
