
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useVendorData, useVendorPizzas, useVendorOrders } from '@/hooks/useVendorData';
import { VendorStats } from '@/components/vendor/VendorStats';
import { OrderManagement } from '@/components/vendor/OrderManagement';
import { PizzaManagement } from '@/components/vendor/PizzaManagement';
import { BusinessProfile } from '@/components/vendor/BusinessProfile';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

export default function VendorDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  const { data: vendor, isLoading: vendorLoading, error: vendorError } = useVendorData();
  const { data: pizzas, isLoading: pizzasLoading } = useVendorPizzas(vendor?.id || '');
  const { data: orders, isLoading: ordersLoading } = useVendorOrders(vendor?.id || '');

  if (vendorLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Loading your dashboard...</span>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (vendorError || !vendor) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card>
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-semibold mb-2">Vendor Profile Not Found</h2>
            <p className="text-muted-foreground mb-4">
              You need to complete your vendor registration to access the dashboard.
            </p>
            <a 
              href="/vendor/register" 
              className="text-orange-600 hover:text-orange-700 font-medium"
            >
              Complete Registration →
            </a>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {vendor.business_name}!
          </h1>
          <p className="text-gray-600">Manage your pizza business from here</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="pizzas">My Pizzas</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="profile">Business Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <VendorStats 
              orders={orders || []} 
              pizzas={pizzas || []} 
              vendor={vendor} 
            />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <OrderManagement orders={orders?.slice(0, 5) || []} />
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Quick Actions</h3>
                  <div className="space-y-2">
                    <button 
                      onClick={() => setActiveTab('pizzas')}
                      className="w-full text-left p-3 rounded-lg bg-orange-50 hover:bg-orange-100 transition-colors"
                    >
                      <div className="font-medium">Manage Pizzas</div>
                      <div className="text-sm text-gray-600">Add, edit, or disable your pizzas</div>
                    </button>
                    <button 
                      onClick={() => setActiveTab('orders')}
                      className="w-full text-left p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors"
                    >
                      <div className="font-medium">View All Orders</div>
                      <div className="text-sm text-gray-600">Track and manage customer orders</div>
                    </button>
                    <button 
                      onClick={() => setActiveTab('profile')}
                      className="w-full text-left p-3 rounded-lg bg-green-50 hover:bg-green-100 transition-colors"
                    >
                      <div className="font-medium">Update Profile</div>
                      <div className="text-sm text-gray-600">Edit business information and settings</div>
                    </button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="pizzas" className="space-y-6">
            <PizzaManagement pizzas={pizzas || []} vendorId={vendor.id} />
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <OrderManagement orders={orders || []} />
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <BusinessProfile vendor={vendor} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
