export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  featured_image: string;
  author: string;
  created_at: string;
  updated_at: string;
  read_time: number;
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
  created_at?: string;
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
  id: string;
  email: string;
  subscribed_at: string;
  active: boolean;
}

export interface SiteSettings {
  site_name: string;
  site_description: string;
  editor_name: string;
  editor_role: string;
  editor_bio: string;
  editor_avatar: string;
  editor_message: string;
}
