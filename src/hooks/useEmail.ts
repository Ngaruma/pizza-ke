
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export function useEmail() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const sendEmail = async (
    to: string,
    subject: string,
    html: string,
    type: 'order_confirmation' | 'status_update' | 'welcome' | 'general',
    orderId?: string
  ) => {
    setLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        throw new Error('You must be logged in to send emails');
      }

      const response = await supabase.functions.invoke('send-email', {
        body: { to, subject, html, type, orderId },
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      toast({
        title: "Email sent",
        description: "Email sent successfully",
      });

      return response.data;
    } catch (error: any) {
      toast({
        title: "Email Error",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { sendEmail, loading };
}
