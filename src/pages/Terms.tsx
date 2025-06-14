
import React from 'react';
import { FileText, Scale, AlertTriangle, CheckCircle, ExternalLink } from 'lucide-react';

export default function Terms() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <Scale className="h-16 w-16 mx-auto mb-6 text-orange-200" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms of Service</h1>
          <p className="text-xl">Terms and conditions for using Pizza.ke directory service</p>
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
              If you do not agree to these terms, please do not use our directory service.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <FileText className="h-6 w-6 text-orange-600 mr-2" />
              Service Description
            </h2>
            <p className="text-gray-600 mb-6">
              Pizza.ke is an online directory service that connects customers with local pizza vendors 
              across Kenya. We provide a platform where users can discover pizza vendors, view their 
              information, and are then directed to the vendors' own websites or platforms to complete 
              their purchases.
            </p>
            
            <div className="bg-orange-50 border-l-4 border-orange-600 p-6 mb-8">
              <div className="flex items-start">
                <ExternalLink className="h-6 w-6 text-orange-600 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-orange-900 mb-2">Important Notice</h3>
                  <p className="text-orange-800">
                    Pizza.ke is a directory service only. We do not process payments, handle orders, 
                    prepare food, or provide delivery services. All transactions occur directly 
                    between customers and vendors through the vendors' own platforms.
                  </p>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">How Our Service Works</h2>
            <ul className="text-gray-600 mb-8 space-y-3">
              <li>• Browse and discover pizza vendors in your area</li>
              <li>• View vendor profiles, menus, and contact information</li>
              <li>• Click through to vendor websites for ordering and checkout</li>
              <li>• Complete all transactions directly with the vendor</li>
              <li>• Contact vendors directly for order support and inquiries</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">User Responsibilities</h2>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">When Using Our Directory</h3>
            <ul className="text-gray-600 mb-6 space-y-2">
              <li>• Provide accurate information when creating an account</li>
              <li>• Use the platform only for lawful purposes</li>
              <li>• Respect vendor information and contact details</li>
              <li>• Follow vendor-specific terms when ordering directly from them</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">When Contacting Vendors</h3>
            <ul className="text-gray-600 mb-8 space-y-2">
              <li>• Be respectful and professional in all communications</li>
              <li>• Understand that each vendor has their own policies</li>
              <li>• Address order issues directly with the respective vendor</li>
              <li>• Comply with individual vendor terms and conditions</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">Vendor Listings</h2>
            <p className="text-gray-600 mb-6">
              Vendors listed on Pizza.ke operate independently. We strive to maintain accurate 
              information but cannot guarantee the completeness or current accuracy of vendor 
              details, including:
            </p>
            <ul className="text-gray-600 mb-8 space-y-2">
              <li>• Menu items and pricing</li>
              <li>• Operating hours and availability</li>
              <li>• Delivery areas and policies</li>
              <li>• Contact information</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <AlertTriangle className="h-6 w-6 text-orange-600 mr-2" />
              Limitation of Liability
            </h2>
            <p className="text-gray-600 mb-6">
              As a directory service, Pizza.ke is not responsible for:
            </p>
            <ul className="text-gray-600 mb-8 space-y-2">
              <li>• Food quality, safety, or preparation by vendors</li>
              <li>• Order processing, payment issues, or delivery problems</li>
              <li>• Vendor availability, pricing changes, or service interruptions</li>
              <li>• Disputes between customers and vendors</li>
              <li>• Accuracy of vendor-provided information</li>
              <li>• Third-party website functionality or security</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">Vendor Responsibilities</h2>
            <p className="text-gray-600 mb-6">Vendors who list their businesses on Pizza.ke agree to:</p>
            <ul className="text-gray-600 mb-8 space-y-2">
              <li>• Provide accurate business information and contact details</li>
              <li>• Maintain their own websites and ordering systems</li>
              <li>• Handle customer orders, payments, and support directly</li>
              <li>• Comply with all applicable health, safety, and business regulations</li>
              <li>• Update their listing information when changes occur</li>
              <li>• Respond to customer inquiries in a timely manner</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">Prohibited Uses</h2>
            <p className="text-gray-600 mb-6">You may not use our directory service to:</p>
            <ul className="text-gray-600 mb-8 space-y-2">
              <li>• Violate any laws or regulations</li>
              <li>• Impersonate others or provide false information</li>
              <li>• Harass or spam vendors listed on our platform</li>
              <li>• Copy or redistribute vendor information without permission</li>
              <li>• Interfere with platform operations or security</li>
              <li>• Use automated tools to scrape vendor data</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">External Links and Third-Party Services</h2>
            <p className="text-gray-600 mb-8">
              Pizza.ke contains links to vendor websites and third-party services. We are not 
              responsible for the content, privacy practices, or terms of service of these 
              external sites. Users access third-party sites at their own risk.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">Data and Privacy</h2>
            <p className="text-gray-600 mb-8">
              We collect and use personal information as outlined in our Privacy Policy. 
              When you visit vendor websites through our links, those sites have their own 
              privacy policies that govern your data.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">Changes to Terms</h2>
            <p className="text-gray-600 mb-8">
              We reserve the right to modify these terms at any time. Changes will be posted on 
              this page with an updated effective date. Continued use of the directory service 
              constitutes acceptance of modified terms.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
            <p className="text-gray-600 mb-4">
              For questions about these Terms of Service or our directory service, contact us at:
            </p>
            <ul className="text-gray-600 space-y-2">
              <li>• Email: legal@pizza.ke</li>
              <li>• Phone: +254 700 123 456</li>
              <li>• General inquiries: hello@pizza.ke</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
