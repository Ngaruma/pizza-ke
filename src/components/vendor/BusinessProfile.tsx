
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useUpdateVendor } from '@/hooks/useVendorData';

interface BusinessProfileProps {
  vendor: any;
}

export const BusinessProfile: React.FC<BusinessProfileProps> = ({ vendor }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    business_name: vendor?.business_name || '',
    phone: vendor?.phone || '',
    email: vendor?.email || '',
    city: vendor?.city || '',
    address: vendor?.address || '',
    description: vendor?.description || '',
    delivery_fee: vendor?.delivery_fee || 0,
    delivery_time_min: vendor?.delivery_time_min || 30,
    delivery_time_max: vendor?.delivery_time_max || 45,
  });

  const updateVendor = useUpdateVendor();

  const handleSave = () => {
    updateVendor.mutate({
      id: vendor.id,
      data: formData
    }, {
      onSuccess: () => {
        setIsEditing(false);
      }
    });
  };

  const handleCancel = () => {
    setFormData({
      business_name: vendor?.business_name || '',
      phone: vendor?.phone || '',
      email: vendor?.email || '',
      city: vendor?.city || '',
      address: vendor?.address || '',
      description: vendor?.description || '',
      delivery_fee: vendor?.delivery_fee || 0,
      delivery_time_min: vendor?.delivery_time_min || 30,
      delivery_time_max: vendor?.delivery_time_max || 45,
    });
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Business Profile</h2>
        {!isEditing && (
          <Button onClick={() => setIsEditing(true)}>
            Edit Profile
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Business Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Business Name</label>
                  <Input
                    value={formData.business_name}
                    onChange={(e) => setFormData({...formData, business_name: e.target.value})}
                    disabled={!isEditing}
                    placeholder="Your restaurant name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Phone Number</label>
                  <Input
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    disabled={!isEditing}
                    placeholder="+254 7XX XXX XXX"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <Input
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    disabled={!isEditing}
                    placeholder="contact@restaurant.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">City</label>
                  <Input
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                    disabled={!isEditing}
                    placeholder="Nairobi"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Address</label>
                <Input
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  disabled={!isEditing}
                  placeholder="Full business address"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  disabled={!isEditing}
                  placeholder="Tell customers about your restaurant..."
                  className="h-24"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Delivery Fee (KSh)</label>
                  <Input
                    type="number"
                    value={formData.delivery_fee}
                    onChange={(e) => setFormData({...formData, delivery_fee: Number(e.target.value)})}
                    disabled={!isEditing}
                    placeholder="100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Min Delivery Time (min)</label>
                  <Input
                    type="number"
                    value={formData.delivery_time_min}
                    onChange={(e) => setFormData({...formData, delivery_time_min: Number(e.target.value)})}
                    disabled={!isEditing}
                    placeholder="30"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Max Delivery Time (min)</label>
                  <Input
                    type="number"
                    value={formData.delivery_time_max}
                    onChange={(e) => setFormData({...formData, delivery_time_max: Number(e.target.value)})}
                    disabled={!isEditing}
                    placeholder="45"
                  />
                </div>
              </div>

              {isEditing && (
                <div className="flex gap-2">
                  <Button 
                    onClick={handleSave}
                    disabled={updateVendor.isPending}
                    className="bg-orange-600 hover:bg-orange-700"
                  >
                    Save Changes
                  </Button>
                  <Button variant="outline" onClick={handleCancel}>
                    Cancel
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Account Status</span>
                <Badge className={vendor?.is_approved ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                  {vendor?.is_approved ? 'Approved' : 'Pending Review'}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Business Status</span>
                <Badge className={vendor?.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                  {vendor?.is_active ? 'Active' : 'Inactive'}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Rating</span>
                <div className="flex items-center">
                  <span className="font-semibold">{vendor?.rating?.toFixed(1) || '0.0'}</span>
                  <span className="text-yellow-500 ml-1">⭐</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span>Total Reviews</span>
                <span className="font-semibold">{vendor?.total_reviews || 0}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
