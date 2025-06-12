
import React from 'react';
import { SubscriptionPlans as SubscriptionPlansComponent } from '@/components/subscription/SubscriptionPlans';
import { useSubscription } from '@/hooks/useSubscription';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

export default function SubscriptionPlans() {
  const { createSubscription } = useSubscription();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handlePlanSelect = async (planId: string, billingCycle: 'monthly' | 'yearly') => {
    try {
      createSubscription({ planId, billingCycle });
    } catch (error) {
      toast({
        title: "Error",
        description: "Please complete vendor registration first",
        variant: "destructive",
      });
      navigate('/vendor/register');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <SubscriptionPlansComponent onPlanSelect={handlePlanSelect} />
      </div>
    </div>
  );
}
