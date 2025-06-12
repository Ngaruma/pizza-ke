
-- Create subscription plans table
CREATE TABLE public.subscription_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  monthly_price DECIMAL(10,2) NOT NULL,
  yearly_price DECIMAL(10,2) NOT NULL,
  features JSONB DEFAULT '[]'::jsonb,
  max_pizzas INTEGER,
  priority_support BOOLEAN DEFAULT false,
  analytics_access BOOLEAN DEFAULT false,
  custom_branding BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create vendor subscriptions table
CREATE TABLE public.vendor_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_id UUID REFERENCES public.vendors(id) ON DELETE CASCADE,
  plan_id UUID REFERENCES public.subscription_plans(id),
  stripe_subscription_id TEXT UNIQUE,
  stripe_customer_id TEXT,
  status TEXT DEFAULT 'inactive', -- inactive, active, past_due, canceled
  billing_cycle TEXT DEFAULT 'monthly', -- monthly, yearly
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  trial_end TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.subscription_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vendor_subscriptions ENABLE ROW LEVEL SECURITY;

-- RLS policies for subscription_plans (public read access)
CREATE POLICY "Anyone can view active subscription plans" ON public.subscription_plans
  FOR SELECT USING (is_active = true);

-- RLS policies for vendor_subscriptions
CREATE POLICY "Vendors can view their own subscription" ON public.vendor_subscriptions
  FOR SELECT USING (
    vendor_id IN (
      SELECT id FROM public.vendors WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Service role can manage all subscriptions" ON public.vendor_subscriptions
  FOR ALL USING (true);

-- Insert default subscription plans
INSERT INTO public.subscription_plans (name, description, monthly_price, yearly_price, features, max_pizzas, priority_support, analytics_access, custom_branding) VALUES
('Starter', 'Perfect for new pizza businesses', 29.99, 299.99, '["Up to 10 pizza listings", "Basic analytics", "Standard support", "Mobile-friendly menu"]'::jsonb, 10, false, false, false),
('Professional', 'Great for growing pizza restaurants', 59.99, 599.99, '["Up to 50 pizza listings", "Advanced analytics", "Priority support", "Custom branding", "Promotional tools"]'::jsonb, 50, true, true, true),
('Enterprise', 'For established pizza chains', 99.99, 999.99, '["Unlimited pizza listings", "Premium analytics", "24/7 dedicated support", "Full custom branding", "API access", "Multi-location management"]'::jsonb, -1, true, true, true);

-- Add subscription status to vendors table
ALTER TABLE public.vendors ADD COLUMN subscription_status TEXT DEFAULT 'inactive';
ALTER TABLE public.vendors ADD COLUMN current_plan_id UUID REFERENCES public.subscription_plans(id);
