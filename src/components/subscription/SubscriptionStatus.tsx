
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { CreditCard, Calendar, Settings } from 'lucide-react';

export const SubscriptionStatus: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();

  const { data: subscription, isLoading, refetch } = useQuery({
    queryKey: ['vendor-subscription', user?.id],
    queryFn: async () => {
      if (!user) return null;

      const { data: vendor } = await supabase
        .from('vendors')
        .select(`
          *,
          current_plan:subscription_plans(*)
        `)
        .eq('user_id', user.id)
        .single();

      if (!vendor) return null;

      const { data: subscription } = await supabase
        .from('vendor_subscriptions')
        .select(`
          *,
          plan:subscription_plans(*)
        `)
        .eq('vendor_id', vendor.id)
        .eq('status', 'active')
        .single();

      return { vendor, subscription };
    },
    enabled: !!user,
  });

  const handleManageSubscription = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('customer-portal');
      if (error) throw error;
      
      window.open(data.url, '_blank');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to open billing portal",
        variant: "destructive",
      });
    }
  };

  const handleRefreshStatus = async () => {
    try {
      await supabase.functions.invoke('check-subscription');
      await refetch();
      toast({
        title: "Status Updated",
        description: "Subscription status has been refreshed",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to refresh status",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-orange-600"></div>
            <span>Loading subscription status...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  const vendor = subscription?.vendor;
  const activeSub = subscription?.subscription;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <CreditCard className="h-5 w-5 mr-2" />
          Subscription Status
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <span>Status</span>
          <Badge className={
            vendor?.subscription_status === 'active' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }>
            {vendor?.subscription_status || 'Inactive'}
          </Badge>
        </div>

        {activeSub?.plan && (
          <>
            <div className="flex justify-between items-center">
              <span>Current Plan</span>
              <span className="font-semibold">{activeSub.plan.name}</span>
            </div>

            <div className="flex justify-between items-center">
              <span>Billing Cycle</span>
              <span className="capitalize">{activeSub.billing_cycle}</span>
            </div>

            {activeSub.current_period_end && (
              <div className="flex justify-between items-center">
                <span>Next Billing Date</span>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{new Date(activeSub.current_period_end).toLocaleDateString()}</span>
                </div>
              </div>
            )}
          </>
        )}

        <div className="flex space-x-2 pt-4">
          <Button onClick={handleRefreshStatus} variant="outline" size="sm">
            Refresh Status
          </Button>
          {vendor?.subscription_status === 'active' && (
            <Button onClick={handleManageSubscription} variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Manage Subscription
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
