
import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { X, Plus } from 'lucide-react';

interface AddPizzaFormProps {
  vendorId: string;
  onClose: () => void;
}

export const AddPizzaForm: React.FC<AddPizzaFormProps> = ({ vendorId, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    base_price: '',
    preparation_time: '15',
    image_url: ''
  });
  const [sizes, setSizes] = useState([{ name: 'Medium', price_modifier: 0 }]);
  const [toppings, setToppings] = useState([{ name: 'Extra Cheese', price: 50 }]);

  const queryClient = useQueryClient();
  const { toast } = useToast();

  const addPizza = useMutation({
    mutationFn: async (data: any) => {
      const { error } = await supabase
        .from('pizzas')
        .insert({
          ...data,
          vendor_id: vendorId,
          sizes: sizes,
          toppings: toppings,
          base_price: parseFloat(data.base_price),
          preparation_time: parseInt(data.preparation_time)
        });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vendor-pizzas'] });
      toast({
        title: "Success",
        description: "Pizza added successfully",
      });
      onClose();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addPizza.mutate(formData);
  };

  const addSize = () => {
    setSizes([...sizes, { name: '', price_modifier: 0 }]);
  };

  const updateSize = (index: number, field: string, value: any) => {
    const newSizes = [...sizes];
    newSizes[index] = { ...newSizes[index], [field]: value };
    setSizes(newSizes);
  };

  const removeSize = (index: number) => {
    setSizes(sizes.filter((_, i) => i !== index));
  };

  const addTopping = () => {
    setToppings([...toppings, { name: '', price: 0 }]);
  };

  const updateTopping = (index: number, field: string, value: any) => {
    const newToppings = [...toppings];
    newToppings[index] = { ...newToppings[index], [field]: value };
    setToppings(newToppings);
  };

  const removeTopping = (index: number) => {
    setToppings(toppings.filter((_, i) => i !== index));
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          Add New Pizza
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Pizza Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Margherita Pizza"
                required
              />
            </div>
            <div>
              <Label htmlFor="base_price">Base Price (KSh) *</Label>
              <Input
                id="base_price"
                type="number"
                step="0.01"
                value={formData.base_price}
                onChange={(e) => setFormData({...formData, base_price: e.target.value})}
                placeholder="500"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Describe your delicious pizza..."
              className="h-20"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="preparation_time">Preparation Time (minutes)</Label>
              <Input
                id="preparation_time"
                type="number"
                value={formData.preparation_time}
                onChange={(e) => setFormData({...formData, preparation_time: e.target.value})}
                placeholder="15"
              />
            </div>
            <div>
              <Label htmlFor="image_url">Image URL</Label>
              <Input
                id="image_url"
                value={formData.image_url}
                onChange={(e) => setFormData({...formData, image_url: e.target.value})}
                placeholder="https://example.com/pizza.jpg"
              />
            </div>
          </div>

          {/* Sizes Section */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <Label>Available Sizes</Label>
              <Button type="button" variant="outline" size="sm" onClick={addSize}>
                <Plus className="h-4 w-4 mr-1" />
                Add Size
              </Button>
            </div>
            <div className="space-y-2">
              {sizes.map((size, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <Input
                    placeholder="Size name (e.g., Small, Large)"
                    value={size.name}
                    onChange={(e) => updateSize(index, 'name', e.target.value)}
                  />
                  <Input
                    type="number"
                    placeholder="Price modifier"
                    value={size.price_modifier}
                    onChange={(e) => updateSize(index, 'price_modifier', parseFloat(e.target.value) || 0)}
                  />
                  {sizes.length > 1 && (
                    <Button type="button" variant="ghost" size="sm" onClick={() => removeSize(index)}>
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Toppings Section */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <Label>Available Toppings</Label>
              <Button type="button" variant="outline" size="sm" onClick={addTopping}>
                <Plus className="h-4 w-4 mr-1" />
                Add Topping
              </Button>
            </div>
            <div className="space-y-2">
              {toppings.map((topping, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <Input
                    placeholder="Topping name"
                    value={topping.name}
                    onChange={(e) => updateTopping(index, 'name', e.target.value)}
                  />
                  <Input
                    type="number"
                    placeholder="Price (KSh)"
                    value={topping.price}
                    onChange={(e) => updateTopping(index, 'price', parseFloat(e.target.value) || 0)}
                  />
                  {toppings.length > 1 && (
                    <Button type="button" variant="ghost" size="sm" onClick={() => removeTopping(index)}>
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              type="submit"
              disabled={addPizza.isPending}
              className="bg-orange-600 hover:bg-orange-700"
            >
              {addPizza.isPending ? 'Adding...' : 'Add Pizza'}
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
