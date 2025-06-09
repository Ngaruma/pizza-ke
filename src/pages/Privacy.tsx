
import React from 'react';
import { Shield, Eye, Lock, Users } from 'lucide-react';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <Shield className="h-16 w-16 mx-auto mb-6 text-orange-200" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-xl">Your privacy is important to us</p>
          <p className="text-sm text-orange-200 mt-4">Last updated: December 2024</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Eye className="h-6 w-6 text-orange-600 mr-2" />
              Information We Collect
            </h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Personal Information</h3>
            <p className="text-gray-600 mb-6">
              When you create an account or place an order, we collect personal information such as:
            </p>
            <ul className="text-gray-600 mb-6 space-y-2">
              <li>• Name and contact information (email, phone number)</li>
              <li>• Delivery address and location data</li>
              <li>• Payment information (processed securely through our payment partners)</li>
              <li>• Order history and preferences</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">Usage Information</h3>
            <p className="text-gray-600 mb-6">
              We automatically collect information about how you use our platform, including:
            </p>
            <ul className="text-gray-600 mb-8 space-y-2">
              <li>• Device information and IP address</li>
              <li>• Browser type and version</li>
              <li>• Pages visited and time spent on our platform</li>
              <li>• Search queries and interactions with vendors</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Lock className="h-6 w-6 text-orange-600 mr-2" />
              How We Use Your Information
            </h2>
            
            <p className="text-gray-600 mb-6">We use your information to:</p>
            <ul className="text-gray-600 mb-8 space-y-2">
              <li>• Process and fulfill your orders</li>
              <li>• Communicate with you about your orders and account</li>
              <li>• Improve our platform and services</li>
              <li>• Provide customer support</li>
              <li>• Send promotional offers (with your consent)</li>
              <li>• Ensure platform security and prevent fraud</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Users className="h-6 w-6 text-orange-600 mr-2" />
              Information Sharing
            </h2>
            
            <p className="text-gray-600 mb-6">
              We do not sell your personal information. We may share your information with:
            </p>
            <ul className="text-gray-600 mb-8 space-y-2">
              <li>• Partner vendors (order details for fulfillment)</li>
              <li>• Delivery partners (contact and location information)</li>
              <li>• Payment processors (payment information for transactions)</li>
              <li>• Service providers who help us operate our platform</li>
              <li>• Law enforcement when required by law</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">Data Security</h2>
            <p className="text-gray-600 mb-8">
              We implement industry-standard security measures to protect your personal information, 
              including encryption, secure servers, and regular security audits. However, no method 
              of transmission over the internet is 100% secure.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Rights</h2>
            <p className="text-gray-600 mb-6">You have the right to:</p>
            <ul className="text-gray-600 mb-8 space-y-2">
              <li>• Access your personal information</li>
              <li>• Correct inaccurate information</li>
              <li>• Delete your account and personal information</li>
              <li>• Opt out of marketing communications</li>
              <li>• Port your data to another service</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">Cookies</h2>
            <p className="text-gray-600 mb-8">
              We use cookies and similar technologies to enhance your experience, analyze usage, 
              and personalize content. You can manage cookie preferences through your browser settings.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Us</h2>
            <p className="text-gray-600">
              If you have questions about this Privacy Policy or how we handle your information, 
              please contact us at privacy@pizza.ke or +254 700 123 456.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
