
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
          <p className="text-xl">Get help with your Pizza.ke vendor account</p>
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
                Get instant help from our vendor support team
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
                Speak directly with our vendor success team
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
                Send us a detailed message about your issue
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
                  <CardTitle className="text-lg">How do I get started as a vendor?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Complete the vendor registration form, provide required documents, 
                    and wait for approval. Our team will guide you through the setup process.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">How do I update my menu items?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Log into your vendor dashboard and navigate to "My Pizzas" section. 
                    You can add, edit, or remove items, update prices, and modify descriptions.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">When do I receive payments?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Payments are transferred to your account weekly on Fridays, minus our 
                    platform fee. You can view your earnings in the dashboard.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">How do I handle order cancellations?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Orders can be cancelled within 5 minutes of placement. For later cancellations, 
                    contact support. Frequent cancellations may affect your vendor rating.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">What are the commission fees?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Our platform fee is 15% per order, which includes payment processing, 
                    customer support, and platform maintenance. No hidden fees.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">How do I improve my vendor rating?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Maintain food quality, ensure timely preparation, respond to customer 
                    feedback, and keep your menu information accurate and up-to-date.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Can I set my own delivery areas?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Yes, you can define your delivery zones and set different fees for 
                    different areas through your vendor dashboard settings.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">How do I report technical issues?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Use the "Report Issue" button in your dashboard or contact support 
                    immediately. Include screenshots and detailed descriptions.
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
                <h3 className="font-semibold text-gray-900 mb-2">Getting Started Guide</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Complete setup instructions for new vendors
                </p>
                <Button variant="outline" size="sm">Download PDF</Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6 text-center">
                <FileText className="h-8 w-8 text-orange-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Best Practices</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Tips to maximize your success on our platform
                </p>
                <Button variant="outline" size="sm">Download PDF</Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6 text-center">
                <FileText className="h-8 w-8 text-orange-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Marketing Toolkit</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Promotional materials and marketing strategies
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
