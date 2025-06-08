
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Category {
  id: string;
  name: string;
}

interface PizzaFiltersProps {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  priceRange: string;
  onPriceRangeChange: (range: string) => void;
  sortBy: string;
  onSortByChange: (sort: string) => void;
}

export function PizzaFilters({
  categories,
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
  sortBy,
  onSortByChange,
}: PizzaFiltersProps) {
  const priceRanges = [
    { value: 'all', label: 'All Prices' },
    { value: '0-500', label: 'Under KSh 500' },
    { value: '500-1000', label: 'KSh 500 - 1,000' },
    { value: '1000-1500', label: 'KSh 1,000 - 1,500' },
    { value: '1500', label: 'Above KSh 1,500' },
  ];

  return (
    <div className="space-y-6">
      {/* Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Categories</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button
            variant={selectedCategory === 'all' ? 'default' : 'ghost'}
            className="w-full justify-start"
            onClick={() => onCategoryChange('all')}
          >
            All Categories
          </Button>
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.name ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() => onCategoryChange(category.name)}
            >
              {category.name}
            </Button>
          ))}
        </CardContent>
      </Card>

      {/* Price Range */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Price Range</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={priceRange} onValueChange={onPriceRangeChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select price range" />
            </SelectTrigger>
            <SelectContent>
              {priceRanges.map((range) => (
                <SelectItem key={range.value} value={range.value}>
                  {range.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Quick Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Filters</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button variant="outline" className="w-full justify-start">
            🌟 Highly Rated (4.5+)
          </Button>
          <Button variant="outline" className="w-full justify-start">
            ⚡ Fast Delivery (&lt;30min)
          </Button>
          <Button variant="outline" className="w-full justify-start">
            🌱 Vegetarian Options
          </Button>
          <Button variant="outline" className="w-full justify-start">
            🆕 New Vendors
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
