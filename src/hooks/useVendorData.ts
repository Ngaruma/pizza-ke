
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export interface Vendor {
  id: string;
  business_name: string;
  description: string;
  address: string;
  city: string;
  phone: string;
  email: string;
  logo_url: string;
  banner_url: string;
  rating: number;
  total_reviews: number;
  delivery_fee: number;
  delivery_time_min: number;
  delivery_time_max: number;
  is_active: boolean;
  is_approved: boolean;
}

export interface Pizza {
  id: string;
  name: string;
  description: string;
  base_price: number;
  image_url: string;
  is_available: boolean;
  preparation_time: number;
  rating: number;
  total_reviews: number;
  sizes: any[];
  toppings: any[];
}

export interface Order {
  id: string;
  customer_id: string;
  total_amount: number;
  status: string;
  payment_status: string;
  delivery_address: string;
  created_at: string;
  order_items: {
    pizza: Pizza;
    quantity: number;
    unit_price: number;
    total_price: number;
  }[];
}

export const useVendorData = () => {
  const { user } = useAuth();
  const { toast } = useToast();

  return useQuery({
    queryKey: ['vendor', user?.id],
    queryFn: async () => {
      if (!user) throw new Error('No user found');
      
      const { data, error } = await supabase
        .from('vendors')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error) throw error;
      return data as Vendor;
    },
    enabled: !!user,
  });
};

export const useVendorPizzas = (vendorId: string) => {
  return useQuery({
    queryKey: ['vendor-pizzas', vendorId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('pizzas')
        .select('*')
        .eq('vendor_id', vendorId);

      if (error) throw error;
      return data as Pizza[];
    },
    enabled: !!vendorId,
  });
};

export const useVendorOrders = (vendorId: string) => {
  return useQuery({
    queryKey: ['vendor-orders', vendorId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (
            *,
            pizza:pizzas(*)
          )
        `)
        .eq('vendor_id', vendorId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Order[];
    },
    enabled: !!vendorId,
  });
};

export const useUpdateVendor = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Vendor> }) => {
      const { error } = await supabase
        .from('vendors')
        .update(data)
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vendor'] });
      toast({
        title: "Success",
        description: "Vendor profile updated successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ orderId, status }: { orderId: string; status: string }) => {
      const { error } = await supabase
        .from('orders')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', orderId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vendor-orders'] });
      toast({
        title: "Success",
        description: "Order status updated successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};
