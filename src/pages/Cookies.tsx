
import React from 'react';
import { Cookie, Settings, Info, ToggleLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function Cookies() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <Cookie className="h-16 w-16 mx-auto mb-6 text-orange-200" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Cookie Policy</h1>
          <p className="text-xl">How we use cookies to improve your experience</p>
          <p className="text-sm text-orange-200 mt-4">Last updated: December 2024</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Cookie Preferences */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="h-5 w-5 text-orange-600 mr-2" />
              Cookie Preferences
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-6">
              Manage your cookie preferences below. Essential cookies cannot be disabled as they 
              are necessary for the platform to function properly.
            </p>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-semibold text-gray-900">Essential Cookies</h4>
                  <p className="text-sm text-gray-600">Required for basic platform functionality</p>
                </div>
                <div className="text-green-600 font-medium">Always Active</div>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-semibold text-gray-900">Analytics Cookies</h4>
                  <p className="text-sm text-gray-600">Help us understand how you use our platform</p>
                </div>
                <Button variant="outline" size="sm">
                  <ToggleLeft className="h-4 w-4 mr-1" />
                  Enable
                </Button>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-semibold text-gray-900">Marketing Cookies</h4>
                  <p className="text-sm text-gray-600">Used to show you relevant advertisements</p>
                </div>
                <Button variant="outline" size="sm">
                  <ToggleLeft className="h-4 w-4 mr-1" />
                  Enable
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Info className="h-6 w-6 text-orange-600 mr-2" />
              What Are Cookies?
            </h2>
            <p className="text-gray-600 mb-8">
              Cookies are small text files that are stored on your device when you visit our website. 
              They help us provide you with a better experience by remembering your preferences, 
              keeping you logged in, and understanding how you use our platform.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">Types of Cookies We Use</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Essential Cookies</h3>
            <p className="text-gray-600 mb-6">
              These cookies are necessary for the website to function properly. They enable core 
              functionality such as:
            </p>
            <ul className="text-gray-600 mb-6 space-y-2">
              <li>• User authentication and login sessions</li>
              <li>• Shopping cart functionality</li>
              <li>• Security and fraud prevention</li>
              <li>• Load balancing and performance optimization</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">Analytics Cookies</h3>
            <p className="text-gray-600 mb-6">
              These cookies help us understand how visitors interact with our website by collecting 
              and reporting information anonymously:
            </p>
            <ul className="text-gray-600 mb-6 space-y-2">
              <li>• Page views and user journeys</li>
              <li>• Popular menu items and search terms</li>
              <li>• Technical performance metrics</li>
              <li>• Device and browser information</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">Functional Cookies</h3>
            <p className="text-gray-600 mb-6">
              These cookies enhance your experience by remembering your choices:
            </p>
            <ul className="text-gray-600 mb-6 space-y-2">
              <li>• Language and region preferences</li>
              <li>• Recently viewed items</li>
              <li>• Delivery address and payment preferences</li>
              <li>• Customized content and recommendations</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">Marketing Cookies</h3>
            <p className="text-gray-600 mb-6">
              These cookies are used to deliver more relevant advertisements:
            </p>
            <ul className="text-gray-600 mb-8 space-y-2">
              <li>• Tracking ad campaign effectiveness</li>
              <li>• Personalizing promotional content</li>
              <li>• Retargeting based on browsing behavior</li>
              <li>• Social media integration</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">Third-Party Cookies</h2>
            <p className="text-gray-600 mb-6">
              We work with trusted third-party services that may set their own cookies:
            </p>
            <ul className="text-gray-600 mb-8 space-y-2">
              <li>• Google Analytics for website analytics</li>
              <li>• Payment processors for secure transactions</li>
              <li>• Social media platforms for sharing features</li>
              <li>• Customer support tools for live chat</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">Managing Your Cookies</h2>
            <p className="text-gray-600 mb-6">
              You can control cookies through several methods:
            </p>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Browser Settings</h3>
            <p className="text-gray-600 mb-6">
              Most browsers allow you to control cookies through their settings. You can:
            </p>
            <ul className="text-gray-600 mb-6 space-y-2">
              <li>• Block all cookies</li>
              <li>• Block third-party cookies only</li>
              <li>• Delete existing cookies</li>
              <li>• Set notifications when cookies are sent</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">Our Cookie Preferences</h3>
            <p className="text-gray-600 mb-8">
              Use the cookie preference center at the top of this page to enable or disable 
              specific types of cookies. Your choices will be remembered for future visits.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">Impact of Disabling Cookies</h2>
            <p className="text-gray-600 mb-6">
              While you can disable cookies, doing so may affect your experience:
            </p>
            <ul className="text-gray-600 mb-8 space-y-2">
              <li>• You may need to log in repeatedly</li>
              <li>• Your preferences won't be saved</li>
              <li>• Some features may not work properly</li>
              <li>• You may see less relevant content</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">Updates to This Policy</h2>
            <p className="text-gray-600 mb-8">
              We may update this Cookie Policy from time to time. Any changes will be posted on 
              this page with a new effective date. We encourage you to review this policy periodically.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Us</h2>
            <p className="text-gray-600">
              If you have questions about our use of cookies, please contact us at 
              privacy@pizza.ke or +254 700 123 456.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
