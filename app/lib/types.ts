export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  featuredImage: string;
  author: string;
  publishedAt: string;
  updatedAt: string;
  readTime: number;
  status: 'draft' | 'published';
  featured: boolean;
  trending: boolean;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  color: string;
  icon: string;
}

export interface Author {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  social: {
    twitter?: string;
    facebook?: string;
    whatsapp?: string;
  };
}

export interface Subscriber {
  email: string;
  subscribedAt: string;
}

export interface SiteSettings {
  siteName: string;
  siteDescription: string;
  editorName: string;
  editorRole: string;
  editorBio: string;
  editorAvatar: string;
  editorMessage: string;
  socialLinks: {
    twitter?: string;
    facebook?: string;
    instagram?: string;
    whatsapp?: string;
  };
}
