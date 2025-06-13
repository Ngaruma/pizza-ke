
import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { 
  Settings, 
  Globe, 
  Mail, 
  Shield, 
  CreditCard,
  Bell,
  Database,
  Save
} from 'lucide-react';

interface SystemConfig {
  id: string;
  site_name: string;
  site_description: string;
  support_email: string;
  maintenance_mode: boolean;
  new_vendor_approval_required: boolean;
  max_delivery_distance: number;
  default_delivery_fee: number;
  platform_commission: number;
  email_notifications: boolean;
  sms_notifications: boolean;
}

export function SystemSettings() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [settings, setSettings] = useState<Partial<SystemConfig>>({});

  const { data: systemConfig, isLoading } = useQuery({
    queryKey: ['system-config'],
    queryFn: async () => {
      // Since we don't have a system_config table, we'll use default values
      // In a real implementation, you'd fetch from a settings table
      return {
        id: '1',
        site_name: 'Pizza Delivery Platform',
        site_description: 'Order delicious pizzas from local vendors',
        support_email: 'support@pizzadelivery.com',
        maintenance_mode: false,
        new_vendor_approval_required: true,
        max_delivery_distance: 10,
        default_delivery_fee: 150,
        platform_commission: 15,
        email_notifications: true,
        sms_notifications: false
      } as SystemConfig;
    },
  });

  const updateSettings = useMutation({
    mutationFn: async (newSettings: Partial<SystemConfig>) => {
      // In a real implementation, you'd save to a settings table
      console.log('Updating settings:', newSettings);
      return newSettings;
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "System settings updated successfully",
      });
      queryClient.invalidateQueries({ queryKey: ['system-config'] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update settings",
        variant: "destructive",
      });
    },
  });

  const handleSave = () => {
    updateSettings.mutate(settings);
  };

  const handleInputChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading settings...</div>;
  }

  const currentSettings = { ...systemConfig, ...settings };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">System Settings</h2>
        <Button onClick={handleSave} disabled={updateSettings.isPending}>
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Globe className="h-5 w-5 mr-2" />
              General Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="siteName">Site Name</Label>
              <Input
                id="siteName"
                value={currentSettings?.site_name || ''}
                onChange={(e) => handleInputChange('site_name', e.target.value)}
                placeholder="Enter site name"
              />
            </div>
            
            <div>
              <Label htmlFor="siteDescription">Site Description</Label>
              <Textarea
                id="siteDescription"
                value={currentSettings?.site_description || ''}
                onChange={(e) => handleInputChange('site_description', e.target.value)}
                placeholder="Enter site description"
                rows={3}
              />
            </div>
            
            <div>
              <Label htmlFor="supportEmail">Support Email</Label>
              <Input
                id="supportEmail"
                type="email"
                value={currentSettings?.support_email || ''}
                onChange={(e) => handleInputChange('support_email', e.target.value)}
                placeholder="support@example.com"
              />
            </div>
          </CardContent>
        </Card>

        {/* Business Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CreditCard className="h-5 w-5 mr-2" />
              Business Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="deliveryDistance">Max Delivery Distance (km)</Label>
              <Input
                id="deliveryDistance"
                type="number"
                value={currentSettings?.max_delivery_distance || 0}
                onChange={(e) => handleInputChange('max_delivery_distance', Number(e.target.value))}
                placeholder="10"
              />
            </div>
            
            <div>
              <Label htmlFor="deliveryFee">Default Delivery Fee (KSh)</Label>
              <Input
                id="deliveryFee"
                type="number"
                value={currentSettings?.default_delivery_fee || 0}
                onChange={(e) => handleInputChange('default_delivery_fee', Number(e.target.value))}
                placeholder="150"
              />
            </div>
            
            <div>
              <Label htmlFor="commission">Platform Commission (%)</Label>
              <Input
                id="commission"
                type="number"
                value={currentSettings?.platform_commission || 0}
                onChange={(e) => handleInputChange('platform_commission', Number(e.target.value))}
                placeholder="15"
                min="0"
                max="100"
              />
            </div>
          </CardContent>
        </Card>

        {/* Security & Approval Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              Security & Approval
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="maintenanceMode">Maintenance Mode</Label>
                <p className="text-sm text-gray-600">Put the site in maintenance mode</p>
              </div>
              <Switch
                id="maintenanceMode"
                checked={currentSettings?.maintenance_mode || false}
                onCheckedChange={(checked) => handleInputChange('maintenance_mode', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="vendorApproval">Vendor Approval Required</Label>
                <p className="text-sm text-gray-600">Require admin approval for new vendors</p>
              </div>
              <Switch
                id="vendorApproval"
                checked={currentSettings?.new_vendor_approval_required || false}
                onCheckedChange={(checked) => handleInputChange('new_vendor_approval_required', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="h-5 w-5 mr-2" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="emailNotifications">Email Notifications</Label>
                <p className="text-sm text-gray-600">Send email notifications to users</p>
              </div>
              <Switch
                id="emailNotifications"
                checked={currentSettings?.email_notifications || false}
                onCheckedChange={(checked) => handleInputChange('email_notifications', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="smsNotifications">SMS Notifications</Label>
                <p className="text-sm text-gray-600">Send SMS notifications to users</p>
              </div>
              <Switch
                id="smsNotifications"
                checked={currentSettings?.sms_notifications || false}
                onCheckedChange={(checked) => handleInputChange('sms_notifications', checked)}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Database Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Database className="h-5 w-5 mr-2" />
            Database Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <Button variant="outline" className="text-blue-600 hover:text-blue-700">
              Export Data
            </Button>
            <Button variant="outline" className="text-orange-600 hover:text-orange-700">
              Clear Cache
            </Button>
            <Button variant="outline" className="text-red-600 hover:text-red-700">
              Reset Analytics
            </Button>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Use these tools carefully. Some actions cannot be undone.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
