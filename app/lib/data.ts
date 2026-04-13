import { Article, Category } from './types';

const articlesData = [
  {
    id: '1',
    slug: 'kdmc-launches-new-digital-portal-citizen-services',
    title: 'KDMC Launches New Digital Portal for Citizen Services',
    excerpt: 'The Kalyan-Dombivli Municipal Corporation has unveiled a comprehensive digital portal aimed at streamlining citizen services.',
    content: 'In a significant step towards digital governance, the Kalyan-Dombivli Municipal Corporation (KDMC) has launched a new citizen services portal that promises to transform how residents interact with municipal authorities.\n\nThe portal offers over 150 services ranging from property tax payments to birth certificates, all accessible from the comfort of home.\n\n## Key Features\n\n- **24/7 Availability**: No more standing in queues\n- **Real-time Status Tracking**: Track your applications instantly\n- **Multiple Payment Options**: UPI, net banking, and card payments accepted\n\n> "This initiative aligns with our vision of making KDMC a smart city." - Mayor Rahul Mehta',
    category: 'civic-updates',
    featured_image: 'https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?w=1200&h=600&fit=crop',
    author: 'Vijay Maniyal',
    created_at: '2026-04-12T09:00:00Z',
    updated_at: '2026-04-12T09:00:00Z',
    read_time: 4,
    status: 'published',
    featured: true,
    trending: true,
  },
  {
    id: '2',
    slug: 'monsoon-preparation-drive-kdmc-2026',
    title: 'KDMC Begins Monsoon Preparation Drive for 2026',
    excerpt: 'With the monsoon season approaching, municipal authorities have launched an extensive preparation drive.',
    content: 'As the monsoon season approaches, the Kalyan-Dombivli Municipal Corporation has launched a comprehensive preparation drive focusing on drainage system maintenance.\n\n## Priority Areas\n\nThe civic body has identified 45 waterlogging-prone spots across Kalyan and Dombivli.\n\n### Drainage Desilting\n- Over 200 kilometers of storm drains to be cleaned\n- 1,200 manpower deployed across zones\n\n> "We learned from last year\'s flooding incidents." - Municipal Commissioner',
    category: 'announcements',
    featured_image: 'https://images.unsplash.com/photo-1502786129293-79981df4e689?w=1200&h=600&fit=crop',
    author: 'Vijay Maniyal',
    created_at: '2026-04-11T14:30:00Z',
    updated_at: '2026-04-11T14:30:00Z',
    read_time: 3,
    status: 'published',
    featured: false,
    trending: true,
  },
  {
    id: '3',
    slug: 'new-metro-line-connectivity-kalyan-dombivli',
    title: 'Mumbai Metro Line 12 Gets Green Signal',
    excerpt: 'The long-awaited Mumbai Metro Line 12 connecting Kalyan to Kasarvadavali has received final approval.',
    content: 'Great news for commuters! The Mumbai Metro Rail Corporation (MMRC) has announced the final approval for Metro Line 12.\n\n## Project Details\n\n- **Total Length**: 20.7 kilometers\n- **Stations**: 17 stations from Kalyan to Kasarvadavali\n- **Estimated Cost**: ₹8,739 crores\n- **Expected Completion**: 2028\n\nThe metro will reduce travel time from Kalyan to Kasarvadavali to just 35 minutes.',
    category: 'civic-updates',
    featured_image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1200&h=600&fit=crop',
    author: 'Vijay Maniyal',
    created_at: '2026-04-10T10:00:00Z',
    updated_at: '2026-04-10T10:00:00Z',
    read_time: 5,
    status: 'published',
    featured: true,
    trending: true,
  },
];

const categoriesData = [
  { id: 'news', slug: 'news', name: 'News', description: 'Latest local news and breaking stories', color: '#1E3A5F', icon: 'Newspaper' },
  { id: 'announcements', slug: 'announcements', name: 'Announcements', description: 'Official announcements', color: '#C41E3A', icon: 'Megaphone' },
  { id: 'civic-updates', slug: 'civic-updates', name: 'Civic Updates', description: 'Infrastructure and civic development', color: '#2563EB', icon: 'Building' },
  { id: 'public-notices', slug: 'public-notices', name: 'Public Notices', description: 'Official public notices', color: '#D97706', icon: 'FileText' },
  { id: 'events', slug: 'events', name: 'Events', description: 'Community events and happenings', color: '#059669', icon: 'Calendar' },
];

export function getAllArticles(): Article[] {
  return articlesData as Article[];
}

export function getArticleBySlug(slug: string): Article | undefined {
  return articlesData.find((a) => a.slug === slug) as Article | undefined;
}

export function getArticlesByCategory(categorySlug: string): Article[] {
  return articlesData.filter((a) => a.category === categorySlug) as Article[];
}

export function getFeaturedArticles(): Article[] {
  return articlesData.filter((a) => a.featured) as Article[];
}

export function getTrendingArticles(): Article[] {
  return articlesData.filter((a) => a.trending).slice(0, 4) as Article[];
}

export function getLatestArticles(limit: number = 6): Article[] {
  return articlesData.slice(0, limit) as Article[];
}

export function searchArticles(query: string): Article[] {
  const lowerQuery = query.toLowerCase();
  return articlesData.filter(
    (a) =>
      a.title.toLowerCase().includes(lowerQuery) ||
      a.excerpt.toLowerCase().includes(lowerQuery)
  ) as Article[];
}

export function getRelatedArticles(currentSlug: string, category: string, limit: number = 3): Article[] {
  return articlesData.filter((a) => a.category === category && a.slug !== currentSlug).slice(0, limit) as Article[];
}

export function getAllCategories(): Category[] {
  return categoriesData as Category[];
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categoriesData.find((c) => c.slug === slug) as Category | undefined;
}
