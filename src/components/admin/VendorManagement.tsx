import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { 
  Eye, 
  Check, 
  X, 
  Trash2, 
  Star,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Vendor {
  id: string;
  business_name: string;
  description: string;
  email: string;
  phone: string;
  city: string;
  rating: number;
  total_reviews: number;
  is_approved: boolean;
  is_active: boolean;
  created_at: string;
}

interface VendorManagementProps {
  vendors: Vendor[];
  onRefresh: () => void;
}

export function VendorManagement({ vendors, onRefresh }: VendorManagementProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [vendorToDelete, setVendorToDelete] = useState<string | null>(null);

  const approveVendor = useMutation({
    mutationFn: async (vendorId: string) => {
      const { error } = await supabase
        .from('vendors')
        .update({ is_approved: true, is_active: true })
        .eq('id', vendorId);

      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Vendor approved successfully",
      });
      onRefresh();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const rejectVendor = useMutation({
    mutationFn: async (vendorId: string) => {
      const { error } = await supabase
        .from('vendors')
        .update({ is_approved: false, is_active: false })
        .eq('id', vendorId);

      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Vendor rejected successfully",
      });
      onRefresh();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const toggleVendorStatus = useMutation({
    mutationFn: async ({ vendorId, isActive }: { vendorId: string; isActive: boolean }) => {
      const { error } = await supabase
        .from('vendors')
        .update({ is_active: !isActive })
        .eq('id', vendorId);

      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Vendor status updated successfully",
      });
      onRefresh();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const deleteVendor = useMutation({
    mutationFn: async (vendorId: string) => {
      const { error } = await supabase
        .from('vendors')
        .delete()
        .eq('id', vendorId);

      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Vendor deleted successfully",
      });
      setDeleteDialogOpen(false);
      setVendorToDelete(null);
      onRefresh();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleDeleteClick = (vendorId: string) => {
    setVendorToDelete(vendorId);
    setDeleteDialogOpen(true);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Business Name</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vendors.map((vendor) => (
              <TableRow key={vendor.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{vendor.business_name}</div>
                    <div className="text-sm text-gray-500 truncate max-w-xs">
                      {vendor.description}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    {vendor.email && (
                      <div className="flex items-center text-sm">
                        <Mail className="h-3 w-3 mr-1 text-gray-400" />
                        <span className="truncate">{vendor.email}</span>
                      </div>
                    )}
                    {vendor.phone && (
                      <div className="flex items-center text-sm">
                        <Phone className="h-3 w-3 mr-1 text-gray-400" />
                        <span>{vendor.phone}</span>
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  {vendor.city && (
                    <div className="flex items-center text-sm">
                      <MapPin className="h-3 w-3 mr-1 text-gray-400" />
                      <span>{vendor.city}</span>
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                    <span className="font-medium">{vendor.rating?.toFixed(1) || '0.0'}</span>
                    <span className="text-sm text-gray-500 ml-1">
                      ({vendor.total_reviews || 0})
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <Badge 
                      variant={vendor.is_approved ? "default" : "secondary"}
                      className={vendor.is_approved ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}
                    >
                      {vendor.is_approved ? "Approved" : "Pending"}
                    </Badge>
                    <Badge 
                      variant={vendor.is_active ? "default" : "secondary"}
                      className={vendor.is_active ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"}
                    >
                      {vendor.is_active ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{formatDate(vendor.created_at)}</span>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setSelectedVendor(vendor)}
                      aria-label="View Vendor Details"
                    >
                      <Eye className="h-4 w-4" />
                      <span className="ml-1">View</span>
                    </Button>
                    
                    {!vendor.is_approved && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-green-600 hover:text-green-700"
                        onClick={() => approveVendor.mutate(vendor.id)}
                        disabled={approveVendor.isPending}
                        aria-label="Approve Vendor"
                      >
                        <Check className="h-4 w-4" />
                        <span className="ml-1">Approve</span>
                      </Button>
                    )}
                    
                    {vendor.is_approved && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-orange-600 hover:text-orange-700"
                        onClick={() => rejectVendor.mutate(vendor.id)}
                        disabled={rejectVendor.isPending}
                        aria-label="Reject Vendor"
                      >
                        <X className="h-4 w-4" />
                        <span className="ml-1">Reject</span>
                      </Button>
                    )}
                    
                    <Button
                      size="sm"
                      variant="outline"
                      className={vendor.is_active ? "text-red-600 hover:text-red-700" : "text-green-600 hover:text-green-700"}
                      onClick={() => toggleVendorStatus.mutate({ vendorId: vendor.id, isActive: vendor.is_active })}
                      disabled={toggleVendorStatus.isPending}
                      aria-label={vendor.is_active ? "Deactivate Vendor" : "Activate Vendor"}
                    >
                      {vendor.is_active ? <X className="h-4 w-4" /> : <Check className="h-4 w-4" />}
                      <span className="ml-1">{vendor.is_active ? "Deactivate" : "Activate"}</span>
                    </Button>
                    
                    <Button
                      size="sm"
                      variant="destructive"
                      className="text-red-600 hover:text-red-700"
                      onClick={() => handleDeleteClick(vendor.id)}
                      aria-label="Delete Vendor"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="ml-1">Delete</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the vendor
              and all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => vendorToDelete && deleteVendor.mutate(vendorToDelete)}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Vendor Details Modal */}
      {selectedVendor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold">{selectedVendor.business_name}</h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedVendor(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Description</h3>
                  <p className="text-gray-600">{selectedVendor.description || 'No description provided'}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium mb-1">Email</h3>
                    <p className="text-gray-600">{selectedVendor.email || 'Not provided'}</p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Phone</h3>
                    <p className="text-gray-600">{selectedVendor.phone || 'Not provided'}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-1">Location</h3>
                  <p className="text-gray-600">{selectedVendor.city || 'Not provided'}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium mb-1">Rating</h3>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                      <span>{selectedVendor.rating?.toFixed(1) || '0.0'}</span>
                      <span className="text-gray-500 ml-1">({selectedVendor.total_reviews || 0} reviews)</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Created</h3>
                    <p className="text-gray-600">{formatDate(selectedVendor.created_at)}</p>
                  </div>
                </div>
                
                <div className="flex space-x-2 pt-4">
                  <Badge 
                    variant={selectedVendor.is_approved ? "default" : "secondary"}
                    className={selectedVendor.is_approved ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}
                  >
                    {selectedVendor.is_approved ? "Approved" : "Pending Approval"}
                  </Badge>
                  <Badge 
                    variant={selectedVendor.is_active ? "default" : "secondary"}
                    className={selectedVendor.is_active ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"}
                  >
                    {selectedVendor.is_active ? "Active" : "Inactive"}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
