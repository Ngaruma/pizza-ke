
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export const useSubscription = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: subscriptionData, isLoading } = useQuery({
    queryKey: ['subscription-status', user?.id],
    queryFn: async () => {
      if (!user) return null;

      const { data: vendor } = await supabase
        .from('vendors')
        .select('*')
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
        .maybeSingle();

      return {
        vendor,
        subscription,
        isActive: vendor.subscription_status === 'active',
        hasSubscription: !!subscription
      };
    },
    enabled: !!user,
  });

  const createSubscription = useMutation({
    mutationFn: async ({ planId, billingCycle }: { planId: string; billingCycle: 'monthly' | 'yearly' }) => {
      const { data, error } = await supabase.functions.invoke('create-subscription', {
        body: { planId, billingCycle }
      });

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      window.open(data.url, '_blank');
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create subscription",
        variant: "destructive",
      });
    },
  });

  const checkSubscription = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.functions.invoke('check-subscription');
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subscription-status'] });
      queryClient.invalidateQueries({ queryKey: ['vendor-subscription'] });
    },
  });

  return {
    subscriptionData,
    isLoading,
    createSubscription: createSubscription.mutate,
    isCreatingSubscription: createSubscription.isPending,
    checkSubscription: checkSubscription.mutate,
    isCheckingSubscription: checkSubscription.isPending,
  };
};
