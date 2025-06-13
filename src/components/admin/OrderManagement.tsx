import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Search, 
  Eye, 
  MapPin,
  Clock,
  DollarSign,
  User,
  Building
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Customer {
  full_name: string | null;
  email: string | null;
  phone: string | null;
}

interface Vendor {
  business_name: string | null;
  email: string | null;
  phone: string | null;
}

interface OrderItem {
  id: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  pizza: {
    name: string | null;
    description: string | null;
  } | null;
}

interface Order {
  id: string;
  customer_id: string;
  vendor_id: string;
  total_amount: number;
  status: string;
  payment_status: string;
  delivery_address: string;
  created_at: string;
  updated_at: string;
  estimated_delivery: string | null;
  delivery_fee: number;
  payment_method: string;
  customer: Customer | null;
  vendor: Vendor | null;
  order_items: OrderItem[] | null;
}

export function OrderManagement() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const { data: orders, isLoading, refetch } = useQuery({
    queryKey: ['admin-orders'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          customer:profiles!orders_customer_id_fkey(full_name, email, phone),
          vendor:vendors(business_name, email, phone),
          order_items(
            id,
            quantity,
            unit_price,
            total_price,
            pizza:pizzas(name, description)
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Order[];
    },
  });

  const updateOrderStatus = useMutation({
    mutationFn: async ({ orderId, status }: { orderId: string; status: string }) => {
      const { error } = await supabase
        .from('orders')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', orderId);

      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Order status updated successfully",
      });
      refetch();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const filteredOrders = orders?.filter(order =>
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.customer?.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.vendor?.business_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.status.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const formatCurrency = (amount: number) => {
    return `KSh ${amount.toLocaleString()}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'preparing': return 'bg-purple-100 text-purple-800';
      case 'ready': return 'bg-orange-100 text-orange-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading orders...</div>;
  }

  return (
    <>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Order Management</h2>
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Vendor</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>
                    <div className="font-mono text-sm">
                      {order.id.substring(0, 8)}...
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{order.customer?.full_name || 'Unknown'}</div>
                      <div className="text-sm text-gray-500">{order.customer?.email || 'No email'}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{order.vendor?.business_name || 'Unknown'}</div>
                      <div className="text-sm text-gray-500">{order.vendor?.email || 'No email'}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{formatCurrency(order.total_amount)}</div>
                    {order.delivery_fee > 0 && (
                      <div className="text-sm text-gray-500">
                        +{formatCurrency(order.delivery_fee)} delivery
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(order.status)}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getPaymentStatusColor(order.payment_status)}>
                      {order.payment_status}
                    </Badge>
                    <div className="text-sm text-gray-500 mt-1">{order.payment_method}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{formatDate(order.created_at)}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSelectedOrder(order)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-xl font-bold">Order Details</h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedOrder(null)}
                >
                  ×
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2 flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      Customer Information
                    </h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p><strong>Name:</strong> {selectedOrder.customer?.full_name || 'Not provided'}</p>
                      <p><strong>Email:</strong> {selectedOrder.customer?.email || 'Not provided'}</p>
                      <p><strong>Phone:</strong> {selectedOrder.customer?.phone || 'Not provided'}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2 flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      Delivery Information
                    </h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p><strong>Address:</strong> {selectedOrder.delivery_address}</p>
                      <p><strong>Delivery Fee:</strong> {formatCurrency(selectedOrder.delivery_fee)}</p>
                      {selectedOrder.estimated_delivery && (
                        <p><strong>Estimated Delivery:</strong> {formatDate(selectedOrder.estimated_delivery)}</p>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2 flex items-center">
                      <Building className="h-4 w-4 mr-2" />
                      Vendor Information
                    </h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p><strong>Business:</strong> {selectedOrder.vendor?.business_name || 'Not provided'}</p>
                      <p><strong>Email:</strong> {selectedOrder.vendor?.email || 'Not provided'}</p>
                      <p><strong>Phone:</strong> {selectedOrder.vendor?.phone || 'Not provided'}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2 flex items-center">
                      <DollarSign className="h-4 w-4 mr-2" />
                      Payment Information
                    </h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p><strong>Total:</strong> {formatCurrency(selectedOrder.total_amount)}</p>
                      <p><strong>Method:</strong> {selectedOrder.payment_method}</p>
                      <p><strong>Status:</strong> 
                        <Badge className={`ml-2 ${getPaymentStatusColor(selectedOrder.payment_status)}`}>
                          {selectedOrder.payment_status}
                        </Badge>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="font-semibold mb-4">Order Items</h3>
                <div className="space-y-3">
                  {selectedOrder.order_items?.map((item) => (
                    <div key={item.id} className="bg-gray-50 p-4 rounded-lg flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">{item.pizza?.name || 'Unknown Pizza'}</h4>
                        <p className="text-sm text-gray-600">{item.pizza?.description || 'No description'}</p>
                        <p className="text-sm">Quantity: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{formatCurrency(item.total_price)}</p>
                        <p className="text-sm text-gray-500">{formatCurrency(item.unit_price)} each</p>
                      </div>
                    </div>
                  )) || <p className="text-gray-500">No items found</p>}
                </div>
              </div>
              
              <div className="flex justify-between items-center pt-4 border-t">
                <div className="flex items-center space-x-4">
                  <Badge className={getStatusColor(selectedOrder.status)}>
                    {selectedOrder.status}
                  </Badge>
                  <span className="text-sm text-gray-500">
                    Created: {formatDate(selectedOrder.created_at)}
                  </span>
                </div>
                
                <div className="flex space-x-2">
                  {selectedOrder.status !== 'delivered' && selectedOrder.status !== 'cancelled' && (
                    <>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateOrderStatus.mutate({ 
                          orderId: selectedOrder.id, 
                          status: 'confirmed' 
                        })}
                        disabled={updateOrderStatus.isPending}
                      >
                        Confirm
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-600 hover:text-red-700"
                        onClick={() => updateOrderStatus.mutate({ 
                          orderId: selectedOrder.id, 
                          status: 'cancelled' 
                        })}
                        disabled={updateOrderStatus.isPending}
                      >
                        Cancel
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
