
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Eye, 
  Edit, 
  Trash2, 
  Pizza,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { AddPizzaForm } from './AddPizzaForm';
import { EditPizzaForm } from './EditPizzaForm';
import { PizzaViewModal } from './PizzaViewModal';

interface PizzaManagementProps {
  pizzas: any[];
  vendorId: string;
}

export const PizzaManagement: React.FC<PizzaManagementProps> = ({ pizzas, vendorId }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingPizza, setEditingPizza] = useState<any>(null);
  const [viewingPizza, setViewingPizza] = useState<any>(null);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const toggleAvailability = useMutation({
    mutationFn: async ({ pizzaId, isAvailable }: { pizzaId: string; isAvailable: boolean }) => {
      const { error } = await supabase
        .from('pizzas')
        .update({ is_available: isAvailable })
        .eq('id', pizzaId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vendor-pizzas'] });
      toast({
        title: "Success",
        description: "Pizza availability updated",
      });
    },
  });

  const deletePizza = useMutation({
    mutationFn: async (pizzaId: string) => {
      const { error } = await supabase
        .from('pizzas')
        .delete()
        .eq('id', pizzaId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vendor-pizzas'] });
      toast({
        title: "Success",
        description: "Pizza deleted successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleDelete = (pizzaId: string, pizzaName: string) => {
    if (window.confirm(`Are you sure you want to delete "${pizzaName}"? This action cannot be undone.`)) {
      deletePizza.mutate(pizzaId);
    }
  };

  if (showAddForm) {
    return <AddPizzaForm vendorId={vendorId} onClose={() => setShowAddForm(false)} />;
  }

  if (editingPizza) {
    return <EditPizzaForm pizza={editingPizza} onClose={() => setEditingPizza(null)} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">My Pizzas</h2>
        <Button 
          onClick={() => setShowAddForm(true)}
          className="bg-orange-600 hover:bg-orange-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New Pizza
        </Button>
      </div>

      {pizzas?.length === 0 ? (
        <Card>
          <CardContent className="py-12">
            <div className="text-center">
              <Pizza className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No pizzas yet</h3>
              <p className="text-muted-foreground mb-4">
                Start by adding your first pizza to attract customers
              </p>
              <Button onClick={() => setShowAddForm(true)}>
                Add Your First Pizza
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {pizzas?.map((pizza) => (
            <Card key={pizza.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                      {pizza.image_url ? (
                        <img 
                          src={pizza.image_url} 
                          alt={pizza.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Pizza className="h-8 w-8 text-gray-400" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{pizza.name}</h3>
                      <p className="text-gray-600">KSh {pizza.base_price}</p>
                      <p className="text-sm text-gray-500">
                        {pizza.total_reviews} reviews • {pizza.rating?.toFixed(1)} ⭐
                      </p>
                      {pizza.description && (
                        <p className="text-sm text-gray-500 mt-1 max-w-md">
                          {pizza.description}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={pizza.is_available ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                      {pizza.is_available ? 'Available' : 'Unavailable'}
                    </Badge>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleAvailability.mutate({ 
                        pizzaId: pizza.id, 
                        isAvailable: !pizza.is_available 
                      })}
                      disabled={toggleAvailability.isPending}
                    >
                      {pizza.is_available ? (
                        <ToggleRight className="h-4 w-4 text-green-600" />
                      ) : (
                        <ToggleLeft className="h-4 w-4 text-gray-400" />
                      )}
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setViewingPizza(pizza)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setEditingPizza(pizza)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDelete(pizza.id, pizza.name)}
                      disabled={deletePizza.isPending}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {viewingPizza && (
        <PizzaViewModal 
          pizza={viewingPizza} 
          onClose={() => setViewingPizza(null)} 
        />
      )}
    </div>
  );
};
