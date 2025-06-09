
import React from 'react';
import { FileText, Scale, AlertTriangle, CheckCircle } from 'lucide-react';

export default function Terms() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <Scale className="h-16 w-16 mx-auto mb-6 text-orange-200" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms of Service</h1>
          <p className="text-xl">Terms and conditions for using Pizza.ke</p>
          <p className="text-sm text-orange-200 mt-4">Last updated: December 2024</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <CheckCircle className="h-6 w-6 text-orange-600 mr-2" />
              Acceptance of Terms
            </h2>
            <p className="text-gray-600 mb-8">
              By accessing and using Pizza.ke, you agree to be bound by these Terms of Service. 
              If you do not agree to these terms, please do not use our platform.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <FileText className="h-6 w-6 text-orange-600 mr-2" />
              Platform Description
            </h2>
            <p className="text-gray-600 mb-8">
              Pizza.ke is an online marketplace that connects customers with local pizza vendors. 
              We facilitate orders and payments but do not prepare, handle, or deliver food directly. 
              Our partner vendors are responsible for food preparation and quality.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">User Accounts</h2>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Account Creation</h3>
            <p className="text-gray-600 mb-6">
              To place orders, you must create an account with accurate information. You are 
              responsible for maintaining the confidentiality of your account credentials.
            </p>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Account Responsibilities</h3>
            <ul className="text-gray-600 mb-8 space-y-2">
              <li>• Provide accurate and current information</li>
              <li>• Keep your password secure</li>
              <li>• Notify us immediately of any unauthorized use</li>
              <li>• Use the platform only for lawful purposes</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">Orders and Payments</h2>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Placing Orders</h3>
            <p className="text-gray-600 mb-6">
              When you place an order, you enter into a contract with the vendor. Pizza.ke 
              facilitates the transaction but is not a party to the sale.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">Pricing and Payment</h3>
            <ul className="text-gray-600 mb-8 space-y-2">
              <li>• All prices are in Kenyan Shillings (KSh)</li>
              <li>• Prices may change without notice</li>
              <li>• Payment is processed securely through our payment partners</li>
              <li>• Additional fees may apply for delivery and service</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">Delivery and Fulfillment</h2>
            <p className="text-gray-600 mb-6">
              Delivery times are estimates provided by vendors. Pizza.ke is not responsible for delays 
              caused by weather, traffic, or other circumstances beyond our control.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">Delivery Requirements</h3>
            <ul className="text-gray-600 mb-8 space-y-2">
              <li>• Provide accurate delivery address</li>
              <li>• Be available to receive your order</li>
              <li>• Check orders upon delivery for accuracy</li>
              <li>• Report issues immediately through our platform</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <AlertTriangle className="h-6 w-6 text-orange-600 mr-2" />
              Cancellations and Refunds
            </h2>
            <p className="text-gray-600 mb-6">
              Cancellation policies vary by vendor and order status:
            </p>
            <ul className="text-gray-600 mb-8 space-y-2">
              <li>• Orders can typically be cancelled within 5 minutes of placement</li>
              <li>• Refunds for cancelled orders are processed within 3-5 business days</li>
              <li>• Food quality issues should be reported within 30 minutes of delivery</li>
              <li>• Refund decisions are made case-by-case based on vendor policies</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">Vendor Responsibilities</h2>
            <p className="text-gray-600 mb-6">Partner vendors agree to:</p>
            <ul className="text-gray-600 mb-8 space-y-2">
              <li>• Maintain food safety and quality standards</li>
              <li>• Provide accurate menu information and pricing</li>
              <li>• Fulfill orders in a timely manner</li>
              <li>• Handle customer complaints professionally</li>
              <li>• Comply with all applicable health and safety regulations</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">Prohibited Uses</h2>
            <p className="text-gray-600 mb-6">You may not use our platform to:</p>
            <ul className="text-gray-600 mb-8 space-y-2">
              <li>• Violate any laws or regulations</li>
              <li>• Impersonate others or provide false information</li>
              <li>• Interfere with platform operations</li>
              <li>• Post harmful, offensive, or inappropriate content</li>
              <li>• Attempt to gain unauthorized access to our systems</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">Limitation of Liability</h2>
            <p className="text-gray-600 mb-8">
              Pizza.ke is not liable for food quality, preparation, or delivery issues that are 
              the responsibility of our partner vendors. Our liability is limited to the amount 
              paid for the specific order in question.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">Changes to Terms</h2>
            <p className="text-gray-600 mb-8">
              We reserve the right to modify these terms at any time. Changes will be posted on 
              this page with an updated effective date. Continued use of the platform constitutes 
              acceptance of modified terms.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
            <p className="text-gray-600">
              For questions about these Terms of Service, contact us at legal@pizza.ke or 
              +254 700 123 456.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
