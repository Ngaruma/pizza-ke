
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { User, MapPin, Phone, Mail, Package, Clock } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { formatDistanceToNow } from 'date-fns';

export default function Profile() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    full_name: '',
    phone: '',
  });

  // Fetch user profile
  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ['profile', user?.id],
    queryFn: async () => {
      if (!user) throw new Error('No user found');
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  // Fetch user orders
  const { data: orders, isLoading: ordersLoading } = useQuery({
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

  // Update profile mutation
  const updateProfile = useMutation({
    mutationFn: async (data: { full_name: string; phone: string }) => {
      if (!user) throw new Error('No user found');
      
      const { error } = await supabase
        .from('profiles')
        .update(data)
        .eq('id', user.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
      setIsEditing(false);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Initialize form data when profile loads
  React.useEffect(() => {
    if (profile) {
      setProfileData({
        full_name: profile.full_name || '',
        phone: profile.phone || '',
      });
    }
  }, [profile]);

  const handleSave = () => {
    updateProfile.mutate(profileData);
  };

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
          <p className="text-gray-600">Please sign in to view your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Account</h1>
        
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="orders">My Orders</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Profile Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={profile?.avatar_url} />
                    <AvatarFallback className="text-lg">
                      {profile?.full_name?.charAt(0)?.toUpperCase() || user.email?.charAt(0)?.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-semibold">{profile?.full_name || 'Anonymous User'}</h3>
                    <p className="text-gray-600">{user.email}</p>
                    <Badge variant="outline" className="mt-1">{profile?.role}</Badge>
                  </div>
                </div>

                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="full_name">Full Name</Label>
                    {isEditing ? (
                      <Input
                        id="full_name"
                        value={profileData.full_name}
                        onChange={(e) => setProfileData(prev => ({ ...prev, full_name: e.target.value }))}
                        placeholder="Enter your full name"
                      />
                    ) : (
                      <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                        <User className="h-4 w-4 text-gray-400" />
                        <span>{profile?.full_name || 'Not set'}</span>
                      </div>
                    )}
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <span>{user.email}</span>
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="phone">Phone</Label>
                    {isEditing ? (
                      <Input
                        id="phone"
                        value={profileData.phone}
                        onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                        placeholder="Enter your phone number"
                      />
                    ) : (
                      <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span>{profile?.phone || 'Not set'}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  {isEditing ? (
                    <>
                      <Button onClick={handleSave} disabled={updateProfile.isPending}>
                        {updateProfile.isPending ? 'Saving...' : 'Save Changes'}
                      </Button>
                      <Button variant="outline" onClick={() => setIsEditing(false)}>
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <Button onClick={() => setIsEditing(true)}>
                      Edit Profile
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Order History
                </CardTitle>
              </CardHeader>
              <CardContent>
                {ordersLoading ? (
                  <div className="text-center py-8">Loading orders...</div>
                ) : orders?.length === 0 ? (
                  <div className="text-center py-8 text-gray-600">
                    <Package className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <p>No orders yet. Start browsing our delicious pizzas!</p>
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
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
