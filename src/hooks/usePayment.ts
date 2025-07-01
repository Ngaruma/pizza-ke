
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export function usePayment() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const processPayment = async (
    orderId: string,
    amount: number,
    phoneNumber: string,
    paymentMethod: 'mpesa' | 'card'
  ) => {
    setLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        throw new Error('You must be logged in to process payments');
      }

      const response = await supabase.functions.invoke('process-payment', {
        body: { orderId, amount, phoneNumber, paymentMethod },
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      if (response.data.success) {
        toast({
          title: "Payment successful",
          description: `Payment of KSh ${amount} completed successfully`,
        });
      } else {
        throw new Error('Payment failed');
      }

      return response.data;
    } catch (error: any) {
      toast({
        title: "Payment Error",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { processPayment, loading };
}
