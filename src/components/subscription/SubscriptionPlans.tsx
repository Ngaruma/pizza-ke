
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Check, Crown, Zap, Building } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SubscriptionPlansProps {
  onPlanSelect?: (planId: string, billingCycle: 'monthly' | 'yearly') => void;
  currentPlanId?: string;
  showHeader?: boolean;
}

export const SubscriptionPlans: React.FC<SubscriptionPlansProps> = ({ 
  onPlanSelect, 
  currentPlanId,
  showHeader = true 
}) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const { toast } = useToast();

  const { data: plans, isLoading: plansLoading } = useQuery({
    queryKey: ['subscription-plans'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('subscription_plans')
        .select('*')
        .eq('is_active', true)
        .order('monthly_price', { ascending: true });

      if (error) throw error;
      return data;
    },
  });

  const handlePlanSelect = async (planId: string) => {
    if (onPlanSelect) {
      setIsLoading(planId);
      try {
        await onPlanSelect(planId, billingCycle);
      } catch (error) {
        console.error('Error selecting plan:', error);
        toast({
          title: "Error",
          description: "Failed to select plan. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(null);
      }
    }
  };

  const getIcon = (planName: string) => {
    switch (planName.toLowerCase()) {
      case 'starter':
        return <Zap className="h-6 w-6" />;
      case 'professional':
        return <Crown className="h-6 w-6" />;
      case 'enterprise':
        return <Building className="h-6 w-6" />;
      default:
        return <Zap className="h-6 w-6" />;
    }
  };

  const getCardStyle = (planName: string) => {
    switch (planName.toLowerCase()) {
      case 'professional':
        return 'border-orange-500 relative';
      case 'enterprise':
        return 'border-purple-500 relative';
      default:
        return '';
    }
  };

  const calculateSavings = (monthlyPrice: number, yearlyPrice: number) => {
    const yearlyMonthly = monthlyPrice * 12;
    const savings = yearlyMonthly - yearlyPrice;
    const percentage = Math.round((savings / yearlyMonthly) * 100);
    return { savings, percentage };
  };

  if (plansLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {showHeader && (
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Plan</h2>
          <p className="text-gray-600 mb-6">Select the perfect plan for your pizza business</p>
          
          <div className="flex items-center justify-center space-x-4 mb-8">
            <Label htmlFor="billing-toggle" className={billingCycle === 'monthly' ? 'font-semibold' : ''}>
              Monthly
            </Label>
            <Switch
              id="billing-toggle"
              checked={billingCycle === 'yearly'}
              onCheckedChange={(checked) => setBillingCycle(checked ? 'yearly' : 'monthly')}
            />
            <Label htmlFor="billing-toggle" className={billingCycle === 'yearly' ? 'font-semibold' : ''}>
              Yearly
            </Label>
            <Badge className="bg-green-100 text-green-800">Save up to 17%</Badge>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {plans?.map((plan) => {
          const savings = calculateSavings(plan.monthly_price, plan.yearly_price);
          const price = billingCycle === 'yearly' ? plan.yearly_price : plan.monthly_price;
          const isCurrentPlan = currentPlanId === plan.id;
          const features = Array.isArray(plan.features) ? plan.features : [];

          return (
            <Card key={plan.id} className={`${getCardStyle(plan.name)} ${isCurrentPlan ? 'ring-2 ring-orange-500' : ''}`}>
              {plan.name.toLowerCase() === 'professional' && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-orange-600 text-white px-4 py-1">Most Popular</Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center text-orange-600 mb-2">
                  {getIcon(plan.name)}
                </div>
                <CardTitle className="text-xl font-bold">{plan.name}</CardTitle>
                <p className="text-gray-600 text-sm">{plan.description}</p>
                
                <div className="mt-4">
                  <div className="text-3xl font-bold">
                    ${price}
                    <span className="text-base font-normal text-gray-600">
                      /{billingCycle === 'yearly' ? 'year' : 'month'}
                    </span>
                  </div>
                  {billingCycle === 'yearly' && (
                    <div className="text-sm text-green-600 font-medium">
                      Save ${savings.savings.toFixed(2)} ({savings.percentage}%)
                    </div>
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {features.map((feature: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-4 w-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => handlePlanSelect(plan.id)}
                  disabled={isLoading === plan.id || isCurrentPlan}
                  className={`w-full ${
                    plan.name.toLowerCase() === 'professional'
                      ? 'bg-orange-600 hover:bg-orange-700'
                      : plan.name.toLowerCase() === 'enterprise'
                      ? 'bg-purple-600 hover:bg-purple-700'
                      : ''
                  }`}
                >
                  {isLoading === plan.id ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processing...
                    </>
                  ) : isCurrentPlan ? (
                    'Current Plan'
                  ) : (
                    'Get Started'
                  )}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
