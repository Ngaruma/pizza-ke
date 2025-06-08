
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Clock, DollarSign, Users, TrendingUp, Star } from 'lucide-react';

export default function VendorRegister() {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    businessName: '',
    description: '',
    address: '',
    city: '',
    phone: '',
    email: '',
    deliveryTimeMin: 30,
    deliveryTimeMax: 45,
    deliveryFee: 0
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to register as a vendor",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('vendors')
        .insert({
          user_id: user.id,
          business_name: formData.businessName,
          description: formData.description,
          address: formData.address,
          city: formData.city,
          phone: formData.phone,
          email: formData.email,
          delivery_time_min: formData.deliveryTimeMin,
          delivery_time_max: formData.deliveryTimeMax,
          delivery_fee: formData.deliveryFee,
          is_active: false,
          is_approved: false
        });

      if (error) throw error;

      toast({
        title: "Application submitted!",
        description: "Your vendor application has been submitted for review. We'll contact you within 24-48 hours."
      });

      navigate('/');
    } catch (error: any) {
      toast({
        title: "Registration failed",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const benefits = [
    {
      icon: DollarSign,
      title: "Increase Revenue",
      description: "Reach thousands of pizza lovers and grow your business with our platform"
    },
    {
      icon: Users,
      title: "Expand Customer Base",
      description: "Connect with new customers in your area and beyond"
    },
    {
      icon: TrendingUp,
      title: "Business Analytics",
      description: "Track your sales, popular items, and customer feedback"
    },
    {
      icon: Clock,
      title: "Flexible Operations",
      description: "Set your own hours, delivery areas, and pricing"
    }
  ];

  const features = [
    "Easy-to-use vendor dashboard",
    "Real-time order notifications",
    "Customer review management",
    "Inventory tracking",
    "Sales analytics and reports",
    "Marketing tools and promotions"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600/10 to-red-600/10"></div>
        <div className="relative container mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Become a <span className="text-orange-600">Pizza.ke</span> Vendor
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join Kenya's premier pizza marketplace and grow your business. 
            Connect with thousands of hungry customers ready to order from you.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              Free to join
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              Low commission rates
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              24/7 support
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Partner With Pizza.ke?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center p-6 rounded-lg border border-gray-100 hover:shadow-lg transition-shadow">
                <benefit.icon className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Everything You Need to Succeed
              </h2>
              <ul className="space-y-4">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Star className="h-5 w-5 text-orange-600 mr-3" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Active Customers</span>
                  <span className="font-bold text-orange-600">50,000+</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Orders per Month</span>
                  <span className="font-bold text-orange-600">25,000+</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Average Order Value</span>
                  <span className="font-bold text-orange-600">KSh 1,500</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Commission Rate</span>
                  <span className="font-bold text-green-600">Only 12%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-2xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
            <p className="text-gray-600">Fill out the form below and we'll review your application within 24-48 hours.</p>
          </div>

          {!user ? (
            <div className="text-center p-8 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Sign In Required</h3>
              <p className="text-gray-600 mb-6">You need to create an account before registering as a vendor.</p>
              <Button 
                onClick={() => navigate('/auth')}
                className="bg-orange-600 hover:bg-orange-700"
              >
                Sign In / Register
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="businessName">Business Name *</Label>
                  <Input
                    id="businessName"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleInputChange}
                    placeholder="e.g., Mario's Pizza Palace"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="e.g., Nairobi"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Business Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Tell us about your pizza restaurant..."
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="address">Full Address *</Label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Street address, building name, etc."
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+254 700 123 456"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Business Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="info@yourpizza.com"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <Label htmlFor="deliveryTimeMin">Min Delivery Time (minutes)</Label>
                  <Input
                    id="deliveryTimeMin"
                    name="deliveryTimeMin"
                    type="number"
                    value={formData.deliveryTimeMin}
                    onChange={handleInputChange}
                    min="15"
                    max="120"
                  />
                </div>
                <div>
                  <Label htmlFor="deliveryTimeMax">Max Delivery Time (minutes)</Label>
                  <Input
                    id="deliveryTimeMax"
                    name="deliveryTimeMax"
                    type="number"
                    value={formData.deliveryTimeMax}
                    onChange={handleInputChange}
                    min="20"
                    max="180"
                  />
                </div>
                <div>
                  <Label htmlFor="deliveryFee">Delivery Fee (KSh)</Label>
                  <Input
                    id="deliveryFee"
                    name="deliveryFee"
                    type="number"
                    value={formData.deliveryFee}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-orange-600 hover:bg-orange-700 py-6 text-lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting Application..." : "Submit Vendor Application"}
              </Button>

              <p className="text-sm text-gray-500 text-center">
                By submitting this form, you agree to our vendor terms and conditions.
              </p>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
