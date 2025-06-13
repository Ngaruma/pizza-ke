
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, User, ArrowLeft, Share2 } from 'lucide-react';

// This would typically come from a CMS or database
const getBlogPostBySlug = (slug: string) => {
  const posts = [
    {
      id: 1,
      slug: 'best-pizza-toppings-kenya',
      title: 'The Ultimate Guide to Pizza Toppings in Kenya',
      excerpt: 'Discover the most popular pizza toppings loved by Kenyans and how local flavors are revolutionizing the pizza scene.',
      content: `Kenya's pizza scene has exploded in recent years, with local flavors meeting traditional Italian cuisine. From sukuma wiki to nyama choma toppings, Kenyan pizzerias are creating unique combinations that reflect our rich culinary heritage.

## The Most Popular Toppings

The most popular toppings include:
- **Beef pepperoni with local spices** - A twist on the classic with Kenyan beef and traditional spice blends
- **Chicken tikka with pilau spices** - Bringing the flavors of Kenyan-Indian cuisine to pizza
- **Vegetarian options with sukuma wiki and carrots** - Fresh local vegetables that add both nutrition and flavor
- **Seafood pizzas with fresh catch from the coast** - Utilizing Kenya's coastal seafood resources

## Innovation in Bases and Crusts

Local vendors are also experimenting with ugali crusts and chapati bases, creating truly Kenyan pizza experiences. These innovations not only cater to local tastes but also make pizza more accessible to different dietary preferences and cultural backgrounds.

## The Cultural Impact

This fusion of Italian pizza tradition with Kenyan ingredients represents more than just food innovation - it's a reflection of Kenya's diverse cultural landscape and our ability to adapt global cuisines to local preferences while maintaining authenticity.

## Where to Find the Best Local Toppings

Many local pizza vendors across Nairobi, Mombasa, Kisumu, and other major cities are now offering these unique combinations. Look for vendors who source their ingredients locally and aren't afraid to experiment with traditional Kenyan flavors.`,
      author: 'Pizza Kenya Team',
      publishedAt: '2024-01-15',
      readTime: '5 min read',
      category: 'Food Trends',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=1200&h=600&fit=crop'
    },
    {
      id: 2,
      slug: 'pizza-delivery-nairobi-guide',
      title: 'Fast Pizza Delivery in Nairobi: What You Need to Know',
      excerpt: 'Everything about getting hot, fresh pizza delivered to your door in Nairobi, from traffic considerations to the best ordering times.',
      content: `Getting pizza delivered in Nairobi can be tricky due to traffic and location challenges. Here's your complete guide to ensuring you get hot, fresh pizza every time.

## Best Delivery Times

**Weekdays:**
- 11am-2pm (lunch rush, but good for office deliveries)
- 7pm-9pm (dinner time, plan accordingly)

**Weekends:**
- 12pm-3pm (weekend lunch)
- 6pm-8pm (early dinner before traffic builds)

**Avoid rush hours:** 4pm-7pm on weekdays when traffic is heaviest.

## Top Delivery Areas with Fastest Service

- **Westlands and surrounding areas** - Central location with good road access
- **Karen and Lang'ata** - Well-planned estates with clear addressing
- **Kilimani and Kileleshwa** - High-density areas with established delivery routes
- **Parts of Eastlands** with good road access and clear landmarks

## Tips for Better Delivery Experience

### Before Ordering:
- Provide clear directions and landmarks
- Include your phone number and keep it accessible
- Consider weather conditions during rainy season
- Pre-order during peak times like weekends

### During Delivery:
- Be available to receive calls from the delivery person
- Have exact change ready if paying cash
- Consider tipping for exceptional service
- Provide feedback to help improve service

## Understanding Delivery Fees

Most vendors charge between KSh 200-500 for delivery depending on distance. Some offer free delivery for orders above a certain amount, typically KSh 1,500-2,000.

## Weather Considerations

During heavy rains, delivery times can increase significantly. Consider:
- Ordering earlier than usual
- Being patient with delivery times
- Having backup indoor plans if you're ordering for an event`,
      author: 'Delivery Expert',
      publishedAt: '2024-01-10',
      readTime: '4 min read',
      category: 'Delivery Tips',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=600&fit=crop'
    },
    {
      id: 3,
      slug: 'supporting-local-pizza-vendors',
      title: 'Why Supporting Local Pizza Vendors Matters',
      excerpt: 'Learn how choosing local pizza vendors helps build stronger communities and supports Kenyan entrepreneurs.',
      content: `Supporting local pizza vendors goes beyond just getting great food - it's about building stronger communities and supporting Kenyan entrepreneurship.

## Economic Impact

Every shilling spent locally has a multiplier effect:
- **Local multiplier effect:** Every shilling spent locally multiplies 3-4 times in the community
- **Job creation:** Local vendors employ neighborhood residents, creating local jobs
- **Profit retention:** Profits stay within Kenya rather than going to international chains
- **Supply chain support:** Local vendors often source from local suppliers, supporting the entire ecosystem

## Quality Benefits of Choosing Local

### Fresh, Local Ingredients
Local vendors often have direct relationships with suppliers, ensuring fresher ingredients and supporting local agriculture.

### Customization Based on Local Tastes
They understand Kenyan preferences and can customize pizzas to local dietary needs and cultural preferences.

### Better Customer Service
Local vendors rely on community reputation and often provide more personalized service.

### Innovation in Kenyan Cuisine
They're more likely to experiment with local ingredients and create uniquely Kenyan pizza experiences.

## Community Building Impact

### Event Sponsorship
Local vendors often sponsor community events, sports teams, and local initiatives.

### Understanding Local Needs
They understand dietary restrictions, cultural preferences, and community events.

### Creating Gathering Spaces
Local pizza shops often become community gathering places where neighbors meet.

### Cultural Development
They contribute to the development of local food culture and traditions.

## How You Can Support Local Vendors

### Direct Support
- Order directly from local vendors when possible
- Choose pickup over delivery apps when convenient
- Pay with cash when possible to avoid transaction fees

### Community Support
- Leave positive reviews on Google and social media
- Share their content and posts
- Refer friends and family
- Attend their events and promotions

### Long-term Relationship Building
- Become a regular customer
- Provide constructive feedback
- Engage with them on social media
- Support their community initiatives

## The Bigger Picture

When you choose local pizza vendors, you're not just buying food - you're investing in your community's economic health, supporting Kenyan entrepreneurship, and helping preserve the diversity that makes Kenya's food scene so vibrant.`,
      author: 'Community Advocate',
      publishedAt: '2024-01-05',
      readTime: '6 min read',
      category: 'Community',
      image: 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=1200&h=600&fit=crop'
    }
  ];

  return posts.find(post => post.slug === slug);
};

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogPostBySlug(slug) : null;

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 lg:px-6 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Post Not Found</h1>
          <p className="text-gray-600 mb-8">The blog post you're looking for doesn't exist.</p>
          <Link to="/blogs">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      });
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white">
        <div className="container mx-auto px-4 lg:px-6 py-8">
          <div className="max-w-4xl mx-auto">
            <Link to="/blogs" className="inline-flex items-center text-orange-600 hover:text-orange-700 mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Link>
            
            <div className="mb-6">
              <Badge variant="secondary" className="mb-4">{post.category}</Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {post.title}
              </h1>
              <p className="text-xl text-gray-600 mb-6">
                {post.excerpt}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6 text-sm text-gray-500">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    {post.author}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(post.publishedAt).toLocaleDateString()}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {post.readTime}
                  </div>
                </div>
                
                <Button variant="outline" size="sm" onClick={handleShare}>
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      <div className="w-full h-64 md:h-96 overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="bg-white py-12">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              {post.content.split('\n\n').map((paragraph, index) => {
                if (paragraph.startsWith('## ')) {
                  return (
                    <h2 key={index} className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                      {paragraph.replace('## ', '')}
                    </h2>
                  );
                } else if (paragraph.includes('**') || paragraph.includes('- **')) {
                  return (
                    <div key={index} className="mb-4">
                      {paragraph.split('\n').map((line, lineIndex) => {
                        if (line.startsWith('- **')) {
                          const [boldPart, normalPart] = line.replace('- **', '').split('** - ');
                          return (
                            <ul key={lineIndex} className="list-disc list-inside mb-2">
                              <li>
                                <strong>{boldPart}</strong> - {normalPart}
                              </li>
                            </ul>
                          );
                        } else if (line.startsWith('- ')) {
                          return (
                            <ul key={lineIndex} className="list-disc list-inside mb-1">
                              <li>{line.replace('- ', '')}</li>
                            </ul>
                          );
                        } else if (line.includes('**')) {
                          const parts = line.split('**');
                          return (
                            <p key={lineIndex} className="mb-2">
                              {parts.map((part, partIndex) => 
                                partIndex % 2 === 1 ? <strong key={partIndex}>{part}</strong> : part
                              )}
                            </p>
                          );
                        } else {
                          return <p key={lineIndex} className="mb-2">{line}</p>;
                        }
                      })}
                    </div>
                  );
                } else {
                  return (
                    <p key={index} className="text-gray-700 mb-4 leading-relaxed">
                      {paragraph}
                    </p>
                  );
                }
              })}
            </div>

            {/* Call to Action */}
            <div className="mt-12 p-6 bg-orange-50 rounded-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Ready to explore Kenya's best pizza?
              </h3>
              <p className="text-gray-600 mb-4">
                Browse our platform to discover amazing local pizza vendors in your area.
              </p>
              <Link to="/browse">
                <Button className="bg-orange-600 hover:bg-orange-700">
                  Browse Pizza Vendors
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
