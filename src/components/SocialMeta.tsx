
import { useEffect } from 'react';

interface SocialMetaProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

export function SocialMeta({ title, description, image, url }: SocialMetaProps) {
  useEffect(() => {
    // Update document title
    if (title) {
      document.title = title;
    }

    // Update or create meta tags
    const updateMetaTag = (property: string, content: string) => {
      let meta = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    const updateNameMetaTag = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    if (title) {
      updateMetaTag('og:title', title);
      updateNameMetaTag('twitter:title', title);
    }

    if (description) {
      updateMetaTag('og:description', description);
      updateNameMetaTag('twitter:description', description);
      updateNameMetaTag('description', description);
    }

    if (image) {
      updateMetaTag('og:image', image);
      updateNameMetaTag('twitter:image', image);
    }

    if (url) {
      updateMetaTag('og:url', url);
    }

    // Cleanup function to reset to defaults when component unmounts
    return () => {
      document.title = 'Pizza.ke - Kenya\'s #1 Pizza Marketplace';
      updateMetaTag('og:title', 'Pizza.ke - Kenya\'s #1 Pizza Marketplace');
      updateMetaTag('og:description', 'Discover amazing pizzas from the best local vendors. Fresh ingredients, authentic flavors, delivered right to your door.');
      updateMetaTag('og:image', 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&h=630&q=80');
      updateNameMetaTag('description', 'Kenya\'s #1 Pizza Marketplace - Fresh ingredients, authentic flavors, delivered right to your door.');
    };
  }, [title, description, image, url]);

  return null;
}
