
import React from 'react';
import { Pizza, Users, Award, Heart, Target, Eye } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <Pizza className="h-16 w-16 mx-auto mb-6 text-orange-200" />
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Pizza.ke</h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed">
            Kenya's premier pizza marketplace connecting food lovers with the best local vendors. 
            We're passionate about bringing authentic flavors and fresh ingredients right to your doorstep.
          </p>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8 text-center">
              <Target className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed">
                To revolutionize Kenya's food delivery landscape by connecting pizza lovers with 
                authentic local vendors, ensuring fresh, quality meals reach every corner of the country 
                while supporting local businesses and communities.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-8 text-center">
              <Eye className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h2>
              <p className="text-gray-600 leading-relaxed">
                To become East Africa's leading food marketplace, where every meal tells a story 
                of quality, community, and cultural authenticity, making great food accessible 
                to everyone while empowering local food entrepreneurs.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Values */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            The principles that guide everything we do at Pizza.ke
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <Heart className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Quality First</h3>
            <p className="text-gray-600">
              We partner only with vendors who share our commitment to using fresh ingredients 
              and maintaining the highest food safety standards.
            </p>
          </div>

          <div className="text-center">
            <Users className="h-12 w-12 text-blue-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Community Focus</h3>
            <p className="text-gray-600">
              Supporting local businesses and creating opportunities for food entrepreneurs 
              to grow and thrive in their communities.
            </p>
          </div>

          <div className="text-center">
            <Award className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Excellence</h3>
            <p className="text-gray-600">
              Continuously improving our platform and services to provide the best possible 
              experience for both customers and vendors.
            </p>
          </div>
        </div>

        {/* Story */}
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Our Story</h2>
            <div className="prose prose-lg max-w-none text-gray-600">
              <p className="mb-6">
                Pizza.ke was born from a simple idea: every Kenyan deserves access to great pizza, 
                and every local vendor deserves a platform to showcase their culinary talents. 
                Founded in 2024, we started as a small team of food enthusiasts who noticed a gap 
                in the market for a dedicated pizza marketplace.
              </p>
              <p className="mb-6">
                What began as a weekend project quickly grew into something much bigger. We realized 
                that by focusing specifically on pizza, we could create a specialized platform that 
                truly understands the needs of both pizza lovers and pizza makers. From wood-fired 
                artisan pizzas to quick family favorites, we celebrate the diversity of pizza culture in Kenya.
              </p>
              <p>
                Today, Pizza.ke proudly serves customers across major Kenyan cities, working with 
                dozens of verified vendors who share our passion for quality food and excellent service. 
                We're not just a delivery platform – we're a community that brings people together 
                over one of the world's most beloved foods.
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-orange-200">Partner Vendors</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">10K+</div>
              <div className="text-orange-200">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">5</div>
              <div className="text-orange-200">Cities Served</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">100K+</div>
              <div className="text-orange-200">Pizzas Delivered</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
