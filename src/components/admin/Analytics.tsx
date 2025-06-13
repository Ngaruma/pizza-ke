
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  TrendingUp, 
  DollarSign, 
  ShoppingBag, 
  Users,
  Building,
  Pizza,
  Star,
  Clock
} from 'lucide-react';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export function Analytics() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['admin-analytics'],
    queryFn: async () => {
      const [
        { data: orders },
        { data: vendors },
        { data: pizzas },
        { data: users },
        { data: reviews }
      ] = await Promise.all([
        supabase.from('orders').select('*'),
        supabase.from('vendors').select('*'),
        supabase.from('pizzas').select('*'),
        supabase.from('profiles').select('*'),
        supabase.from('reviews').select('*')
      ]);

      const totalRevenue = orders?.reduce((sum, order) => sum + (order.total_amount || 0), 0) || 0;
      const totalOrders = orders?.length || 0;
      const totalVendors = vendors?.length || 0;
      const totalUsers = users?.length || 0;
      const totalPizzas = pizzas?.length || 0;
      const averageRating = reviews?.length > 0 
        ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
        : 0;

      // Order status distribution
      const orderStatusData = orders?.reduce((acc, order) => {
        acc[order.status] = (acc[order.status] || 0) + 1;
        return acc;
      }, {} as Record<string, number>) || {};

      const statusChartData = Object.entries(orderStatusData).map(([status, count]) => ({
        name: status,
        count
      }));

      // Revenue over time (last 7 days)
      const last7Days = Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - i);
        return date.toISOString().split('T')[0];
      }).reverse();

      const revenueData = last7Days.map(date => {
        const dayRevenue = orders?.filter(order => 
          order.created_at?.startsWith(date)
        ).reduce((sum, order) => sum + (order.total_amount || 0), 0) || 0;
        
        return {
          date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          revenue: dayRevenue
        };
      });

      // Top vendors by orders
      const vendorOrderCounts = orders?.reduce((acc, order) => {
        acc[order.vendor_id] = (acc[order.vendor_id] || 0) + 1;
        return acc;
      }, {} as Record<string, number>) || {};

      const topVendorsData = await Promise.all(
        Object.entries(vendorOrderCounts)
          .sort(([,a], [,b]) => b - a)
          .slice(0, 5)
          .map(async ([vendorId, orderCount]) => {
            const { data: vendor } = await supabase
              .from('vendors')
              .select('business_name')
              .eq('id', vendorId)
              .single();
            
            return {
              name: vendor?.business_name || 'Unknown',
              orders: orderCount
            };
          })
      );

      return {
        totalRevenue,
        totalOrders,
        totalVendors,
        totalUsers,
        totalPizzas,
        averageRating,
        statusChartData,
        revenueData,
        topVendorsData
      };
    },
  });

  if (isLoading) {
    return <div className="text-center py-8">Loading analytics...</div>;
  }

  const statCards = [
    {
      title: "Total Revenue",
      value: `KSh ${stats?.totalRevenue?.toLocaleString() || 0}`,
      icon: DollarSign,
      change: "+12.5%",
      changeType: "positive" as const
    },
    {
      title: "Total Orders",
      value: stats?.totalOrders || 0,
      icon: ShoppingBag,
      change: "+8.2%",
      changeType: "positive" as const
    },
    {
      title: "Active Vendors",
      value: stats?.totalVendors || 0,
      icon: Building,
      change: "+3.1%",
      changeType: "positive" as const
    },
    {
      title: "Total Users",
      value: stats?.totalUsers || 0,
      icon: Users,
      change: "+15.3%",
      changeType: "positive" as const
    },
    {
      title: "Total Pizzas",
      value: stats?.totalPizzas || 0,
      icon: Pizza,
      change: "+5.7%",
      changeType: "positive" as const
    },
    {
      title: "Average Rating",
      value: stats?.averageRating?.toFixed(1) || "0.0",
      icon: Star,
      change: "+0.3",
      changeType: "positive" as const
    }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Analytics Dashboard</h2>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {statCards.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className={`text-xs ${
                stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend (Last 7 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={stats?.revenueData || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip formatter={(value) => [`KSh ${value}`, 'Revenue']} />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#8884d8" 
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Order Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Order Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={stats?.statusChartData || []}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {(stats?.statusChartData || []).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Vendors */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Top Vendors by Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stats?.topVendorsData || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="orders" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
