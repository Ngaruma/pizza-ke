import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  Building, 
  ShoppingBag, 
  BarChart3,
  Settings,
  Clock,
  CheckCircle,
  XCircle,
  TrendingUp
} from 'lucide-react';
import { VendorManagement } from '@/components/admin/VendorManagement';
import { UserManagement } from '@/components/admin/UserManagement';
import { OrderManagement } from '@/components/admin/OrderManagement';
import { Analytics } from '@/components/admin/Analytics';
import { SystemSettings } from '@/components/admin/SystemSettings';

export default function AdminDashboard() {
  const { user } = useAuth();

  // Simple admin check - you can enhance this by checking user roles in profiles table
  const { data: isAdmin, isLoading: checkingAdmin } = useQuery({
    queryKey: ['is-admin', user?.id],
    queryFn: async () => {
      if (!user) return false;
      
      // For now, check if user email contains 'admin' - you should implement proper role checking
      const isAdminUser = user.email?.includes('admin') || user.email === 'jcngaruma@gmail.com';
      return isAdminUser;
    },
    enabled: !!user,
  });

  // Fetch vendors data
  const { data: vendors, isLoading: vendorsLoading, refetch: refetchVendors } = useQuery({
    queryKey: ['admin-vendors'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('vendors')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    },
    enabled: isAdmin === true,
  });

  // Fetch dashboard stats
  const { data: dashboardStats, isLoading: statsLoading } = useQuery({
    queryKey: ['admin-dashboard-stats'],
    queryFn: async () => {
      const [
        { data: vendorsData },
        { data: orders },
        { data: users },
        { data: reviews }
      ] = await Promise.all([
        supabase.from('vendors').select('*'),
        supabase.from('orders').select('*'),
        supabase.from('profiles').select('*'),
        supabase.from('reviews').select('*')
      ]);

      const totalRevenue = orders?.reduce((sum, order) => sum + (order.total_amount || 0), 0) || 0;
      const todayOrders = orders?.filter(order => {
        const orderDate = new Date(order.created_at);
        const today = new Date();
        return orderDate.toDateString() === today.toDateString();
      }).length || 0;

      return {
        totalVendors: vendorsData?.length || 0,
        approvedVendors: vendorsData?.filter(v => v.is_approved).length || 0,
        pendingVendors: vendorsData?.filter(v => !v.is_approved).length || 0,
        activeVendors: vendorsData?.filter(v => v.is_active).length || 0,
        totalOrders: orders?.length || 0,
        todayOrders,
        totalUsers: users?.length || 0,
        totalRevenue,
        averageRating: reviews?.length > 0 
          ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
          : '0.0'
      };
    },
    enabled: isAdmin === true,
  });

  if (checkingAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p>Checking permissions...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
          <p className="text-gray-600">You don't have permission to access this page.</p>
          <p className="text-sm text-gray-500 mt-2">Current user: {user?.email}</p>
        </div>
      </div>
    );
  }

  // Stats Overview
  const stats = [
    {
      title: "Total Revenue",
      value: `KSh ${dashboardStats?.totalRevenue?.toLocaleString() || 0}`,
      icon: TrendingUp,
      change: "+12%",
      changeType: "positive" as const
    },
    {
      title: "Today's Orders",
      value: dashboardStats?.todayOrders || 0,
      icon: ShoppingBag,
      change: "+8%",
      changeType: "positive" as const
    },
    {
      title: "Total Vendors",
      value: dashboardStats?.totalVendors || 0,
      icon: Building,
      change: `${dashboardStats?.pendingVendors || 0} pending`,
      changeType: "neutral" as const
    },
    {
      title: "Active Users",
      value: dashboardStats?.totalUsers || 0,
      icon: Users,
      change: "+15%",
      changeType: "positive" as const
    },
    {
      title: "Approved Vendors",
      value: dashboardStats?.approvedVendors || 0,
      icon: CheckCircle,
      change: `${dashboardStats?.activeVendors || 0} active`,
      changeType: "neutral" as const
    },
    {
      title: "Pending Approvals",
      value: dashboardStats?.pendingVendors || 0,
      icon: Clock,
      change: "Needs attention",
      changeType: "warning" as const
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Comprehensive platform management and analytics</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className={`text-xs ${
                  stat.changeType === 'positive' ? 'text-green-600' : 
                  stat.changeType === 'warning' ? 'text-orange-600' :
                  'text-muted-foreground'
                }`}>
                  {stat.change}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Dashboard Content */}
        <Card>
          <CardContent className="p-0">
            <Tabs defaultValue="vendors" className="w-full">
              <div className="border-b px-6 py-4">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="vendors" className="flex items-center space-x-2">
                    <Building className="h-4 w-4" />
                    <span>Vendors</span>
                  </TabsTrigger>
                  <TabsTrigger value="orders" className="flex items-center space-x-2">
                    <ShoppingBag className="h-4 w-4" />
                    <span>Orders</span>
                  </TabsTrigger>
                  <TabsTrigger value="users" className="flex items-center space-x-2">
                    <Users className="h-4 w-4" />
                    <span>Users</span>
                  </TabsTrigger>
                  <TabsTrigger value="analytics" className="flex items-center space-x-2">
                    <BarChart3 className="h-4 w-4" />
                    <span>Analytics</span>
                  </TabsTrigger>
                  <TabsTrigger value="settings" className="flex items-center space-x-2">
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </TabsTrigger>
                </TabsList>
              </div>

              <div className="p-6">
                <TabsContent value="vendors" className="space-y-4">
                  {vendorsLoading ? (
                    <div className="text-center py-8">Loading vendors...</div>
                  ) : (
                    <VendorManagement 
                      vendors={vendors || []} 
                      onRefresh={refetchVendors} 
                    />
                  )}
                </TabsContent>

                <TabsContent value="orders" className="space-y-4">
                  <OrderManagement />
                </TabsContent>

                <TabsContent value="users" className="space-y-4">
                  <UserManagement />
                </TabsContent>

                <TabsContent value="analytics" className="space-y-4">
                  <Analytics />
                </TabsContent>

                <TabsContent value="settings" className="space-y-4">
                  <SystemSettings />
                </TabsContent>
              </div>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
