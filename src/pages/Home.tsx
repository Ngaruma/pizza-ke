
import React from 'react';
import { Hero } from '@/components/Hero';
import { FeaturedVendors } from '@/components/FeaturedVendors';
import { TrendingPizzas } from '@/components/TrendingPizzas';
import { OrderTracking } from '@/components/OrderTracking';
import { useAuth } from '@/contexts/AuthContext';

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <Hero />
      
      {/* Order Tracking for logged in users */}
      {user && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <OrderTracking />
          </div>
        </section>
      )}
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <TrendingPizzas />
        </div>
      </section>
      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <FeaturedVendors />
        </div>
      </section>
    </div>
  );
}
