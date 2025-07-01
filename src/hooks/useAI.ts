
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export function useAI() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const askAI = async (message: string, context?: string) => {
    setLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        throw new Error('You must be logged in to use AI features');
      }

      const response = await supabase.functions.invoke('ai-chat', {
        body: { message, context },
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      return response.data.response;
    } catch (error: any) {
      toast({
        title: "AI Error",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { askAI, loading };
}
