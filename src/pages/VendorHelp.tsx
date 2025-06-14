
import React from 'react';
import { HelpCircle, BookOpen, MessageCircle, Phone, Mail, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function VendorHelp() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <HelpCircle className="h-16 w-16 mx-auto mb-6 text-orange-200" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Vendor Support</h1>
          <p className="text-xl">Get help with your Pizza.ke directory listing</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <MessageCircle className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <CardTitle>Live Chat</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Get instant help with your directory listing
              </p>
              <Button className="bg-orange-600 hover:bg-orange-700">
                Start Chat
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Phone className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <CardTitle>Call Support</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Speak directly with our listing support team
              </p>
              <Button variant="outline">
                +254 700 123 456
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Mail className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <CardTitle>Email Support</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Send us questions about your directory listing
              </p>
              <Button variant="outline">
                vendors@pizza.ke
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">How do I get listed on Pizza.ke?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Complete the vendor registration form with your business details and pizza offerings. 
                    Our team will review and approve your listing within 48 hours.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">How do I add external links to my pizzas?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    When adding or editing pizza listings, include your website URL where customers 
                    can view details and place orders. This directs customers to your own site for checkout.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Do you handle payments or orders?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    No, Pizza.ke is a directory service. All transactions, payments, and order fulfillment 
                    are handled directly between you and your customers through your own website.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">What are the listing fees?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Basic directory listings are free. Premium listing features with enhanced visibility 
                    and promotional opportunities are available for a monthly fee.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">How do customers find my business?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Customers browse our directory by location, cuisine type, and ratings. They can 
                    view your pizza offerings and click through to your website to place orders.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Can I update my listing information?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Yes, log into your vendor dashboard to update business information, pizza descriptions, 
                    prices, images, and external links to your website anytime.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">How do customer reviews work?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Customers can leave reviews about their experience with your business. 
                    Reviews help build trust and improve your visibility in search results.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">How do I report technical issues?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Contact our support team immediately if you experience issues with your listing, 
                    dashboard access, or external links. Include screenshots when possible.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Resources Section */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center flex items-center justify-center">
            <BookOpen className="h-6 w-6 text-orange-600 mr-2" />
            Vendor Resources
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6 text-center">
                <FileText className="h-8 w-8 text-orange-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Listing Setup Guide</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Step-by-step instructions for creating your directory listing
                </p>
                <Button variant="outline" size="sm">Download PDF</Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6 text-center">
                <FileText className="h-8 w-8 text-orange-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Best Practices</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Tips to optimize your listing and attract more customers
                </p>
                <Button variant="outline" size="sm">Download PDF</Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6 text-center">
                <FileText className="h-8 w-8 text-orange-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">External Link Guide</h3>
                <p className="text-sm text-gray-600 mb-4">
                  How to effectively link customers to your website for orders
                </p>
                <Button variant="outline" size="sm">Download PDF</Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Support Hours */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Support Hours</h2>
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
            <p className="text-gray-600 mb-2">
              <strong>Monday - Friday:</strong> 8:00 AM - 8:00 PM
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Saturday - Sunday:</strong> 9:00 AM - 6:00 PM
            </p>
            <p className="text-sm text-gray-500">
              EAT (East Africa Time)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
