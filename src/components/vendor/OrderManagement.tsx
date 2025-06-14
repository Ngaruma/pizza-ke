
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useUpdateOrderStatus } from '@/hooks/useVendorData';
import { formatDistanceToNow } from 'date-fns';
import { Package, Clock, MapPin, User } from 'lucide-react';

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

  const statusOptions = [
    { value: 'pending', label: 'Pending' },
    { value: 'preparing', label: 'Preparing' },
    { value: 'ready', label: 'Ready for Pickup/Delivery' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  const canUpdateStatus = (currentStatus: string) => {
    return currentStatus !== 'delivered' && currentStatus !== 'cancelled';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5" />
          Order Management
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {orders?.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Package className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              No orders yet. Start promoting your pizzas!
            </div>
          ) : (
            orders?.map((order) => (
              <div key={order.id} className="border rounded-lg p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">Order #{order.id.slice(0, 8)}</h3>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2 flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      Delivery Details
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      <strong>Address:</strong> {order.delivery_address}
                    </p>
                    {order.delivery_notes && (
                      <p className="text-sm text-muted-foreground">
                        <strong>Notes:</strong> {order.delivery_notes}
                      </p>
                    )}
                    <p className="text-sm text-muted-foreground">
                      <strong>Payment:</strong> {order.payment_status} ({order.payment_method})
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Order Items</h4>
                    <div className="space-y-1">
                      {order.order_items?.map((item: any, idx: number) => (
                        <div key={idx} className="text-sm text-muted-foreground flex justify-between">
                          <span>{item.quantity}x {item.pizza?.name}</span>
                          <span>KSh {item.total_price}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium">Update Status:</label>
                    </div>
                    <div className="flex items-center gap-2">
                      {canUpdateStatus(order.status) ? (
                        <Select
                          value={order.status}
                          onValueChange={(value) => handleStatusChange(order.id, value)}
                          disabled={updateOrderStatus.isPending}
                        >
                          <SelectTrigger className="w-48">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {statusOptions.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <span className="text-sm text-muted-foreground">
                          Status cannot be updated
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};
