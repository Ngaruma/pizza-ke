
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, User } from 'lucide-react';

// Sample blog data - in a real app, this would come from a CMS or database
const blogPosts = [
  {
    id: 1,
    slug: 'best-pizza-toppings-kenya',
    title: 'The Ultimate Guide to Pizza Toppings in Kenya',
    excerpt: 'Discover the most popular pizza toppings loved by Kenyans and how local flavors are revolutionizing the pizza scene.',
    content: `Kenya's pizza scene has exploded in recent years, with local flavors meeting traditional Italian cuisine. From sukuma wiki to nyama choma toppings, Kenyan pizzerias are creating unique combinations that reflect our rich culinary heritage.

The most popular toppings include:
- Beef pepperoni with local spices
- Chicken tikka with pilau spices
- Vegetarian options with sukuma wiki and carrots
- Seafood pizzas with fresh catch from the coast

Local vendors are also experimenting with ugali crusts and chapati bases, creating truly Kenyan pizza experiences.`,
    author: 'Pizza Kenya Team',
    publishedAt: '2024-01-15',
    readTime: '5 min read',
    category: 'Food Trends',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&h=400&fit=crop'
  },
  {
    id: 2,
    slug: 'pizza-delivery-nairobi-guide',
    title: 'Fast Pizza Delivery in Nairobi: What You Need to Know',
    excerpt: 'Everything about getting hot, fresh pizza delivered to your door in Nairobi, from traffic considerations to the best ordering times.',
    content: `Getting pizza delivered in Nairobi can be tricky due to traffic and location challenges. Here's your complete guide to ensuring you get hot, fresh pizza every time.

Best delivery times:
- Weekdays: 11am-2pm and 7pm-9pm
- Weekends: 12pm-3pm and 6pm-8pm
- Avoid rush hours (4pm-7pm on weekdays)

Top delivery areas with fastest service:
- Westlands and surrounding areas
- Karen and Lang'ata
- Kilimani and Kileleshwa
- Parts of Eastlands with good road access

Tips for better delivery:
- Provide clear directions and landmarks
- Have your phone ready for driver calls
- Consider weather conditions during rainy season
- Pre-order during peak times like weekends`,
    author: 'Delivery Expert',
    publishedAt: '2024-01-10',
    readTime: '4 min read',
    category: 'Delivery Tips',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=400&fit=crop'
  },
  {
    id: 3,
    slug: 'supporting-local-pizza-vendors',
    title: 'Why Supporting Local Pizza Vendors Matters',
    excerpt: 'Learn how choosing local pizza vendors helps build stronger communities and supports Kenyan entrepreneurs.',
    content: `Supporting local pizza vendors goes beyond just getting great food - it's about building stronger communities and supporting Kenyan entrepreneurship.

Economic Impact:
- Every shilling spent locally multiplies 3-4 times in the community
- Local vendors employ neighborhood residents
- Profits stay within Kenya rather than going to international chains

Quality Benefits:
- Fresh, locally-sourced ingredients
- Customization based on local tastes
- Better customer service and community connection
- Support for innovation in Kenyan cuisine

Community Building:
- Local vendors sponsor community events
- They understand local preferences and dietary needs
- Create gathering spaces for neighborhoods
- Contribute to local food culture development

How to support:
- Order directly from local vendors when possible
- Leave positive reviews and referrals
- Share their content on social media
- Attend local food events and markets`,
    author: 'Community Advocate',
    publishedAt: '2024-01-05',
    readTime: '6 min read',
    category: 'Community',
    image: 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=800&h=400&fit=crop'
  }
];

const categories = ['All', 'Food Trends', 'Delivery Tips', 'Community', 'Reviews'];

export default function Blogs() {
  const [selectedCategory, setSelectedCategory] = React.useState('All');

  const filteredPosts = selectedCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 lg:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Pizza Kenya Blog
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover the latest trends, tips, and stories from Kenya's vibrant pizza scene
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-orange-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-orange-50 hover:text-orange-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary">{post.category}</Badge>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    {post.readTime}
                  </div>
                </div>
                <CardTitle className="text-xl hover:text-orange-600 transition-colors">
                  <Link to={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    {post.author}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(post.publishedAt).toLocaleDateString()}
                  </div>
                </div>
                <Link
                  to={`/blog/${post.slug}`}
                  className="inline-block mt-4 text-orange-600 hover:text-orange-700 font-medium"
                >
                  Read more →
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* SEO Content Section */}
        <div className="mt-16 bg-white rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            About Pizza Kenya Blog
          </h2>
          <div className="prose max-w-none text-gray-600">
            <p className="mb-4">
              Welcome to the Pizza Kenya blog, your ultimate destination for everything pizza-related in Kenya. 
              We're passionate about connecting pizza lovers with the best local vendors, sharing insider tips, 
              and celebrating Kenya's unique pizza culture.
            </p>
            <p className="mb-4">
              Our blog covers a wide range of topics including pizza delivery guides for major Kenyan cities, 
              reviews of local pizza vendors, trending pizza combinations that incorporate Kenyan flavors, 
              and tips for supporting local businesses in the food industry.
            </p>
            <p>
              Whether you're a pizza enthusiast looking for your next favorite spot, a vendor wanting to 
              connect with customers, or someone interested in Kenya's evolving food scene, you'll find 
              valuable insights and engaging content here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
