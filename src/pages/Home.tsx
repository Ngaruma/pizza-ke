
import React from 'react';
import { Hero } from '@/components/Hero';
import { FeaturedVendors } from '@/components/FeaturedVendors';
import { TrendingPizzas } from '@/components/TrendingPizzas';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <FeaturedVendors />
      <TrendingPizzas />
    </div>
  );
}
