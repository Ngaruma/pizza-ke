
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ShoppingBag, 
  DollarSign, 
  Pizza, 
  TrendingUp,
  Clock,
  Star
} from 'lucide-react';

interface VendorStatsProps {
  orders: any[];
  pizzas: any[];
  vendor: any;
}

export const VendorStats: React.FC<VendorStatsProps> = ({ orders, pizzas, vendor }) => {
  const totalRevenue = orders?.reduce((sum, order) => sum + (order.total_amount || 0), 0) || 0;
  const todayOrders = orders?.filter(order => {
    const orderDate = new Date(order.created_at);
    const today = new Date();
    return orderDate.toDateString() === today.toDateString();
  }).length || 0;

  const pendingOrders = orders?.filter(order => order.status === 'pending').length || 0;
  const activePizzas = pizzas?.filter(pizza => pizza.is_available).length || 0;

  const stats = [
    {
      title: "Today's Orders",
      value: todayOrders,
      icon: ShoppingBag,
      change: "+12%",
      changeType: "positive" as const
    },
    {
      title: "Total Revenue",
      value: `KSh ${totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      change: "+8%",
      changeType: "positive" as const
    },
    {
      title: "Active Pizzas",
      value: activePizzas,
      icon: Pizza,
      change: "2 new",
      changeType: "neutral" as const
    },
    {
      title: "Pending Orders",
      value: pendingOrders,
      icon: Clock,
      change: "-5%",
      changeType: "positive" as const
    },
    {
      title: "Average Rating",
      value: vendor?.rating?.toFixed(1) || "0.0",
      icon: Star,
      change: `${vendor?.total_reviews || 0} reviews`,
      changeType: "neutral" as const
    },
    {
      title: "Revenue Growth",
      value: "+15%",
      icon: TrendingUp,
      change: "vs last month",
      changeType: "positive" as const
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
              stat.changeType === 'neutral' ? 'text-muted-foreground' : 
              'text-red-600'
            }`}>
              {stat.change}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
