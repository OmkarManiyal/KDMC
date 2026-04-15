-- =============================================
-- KDMC News Portal - Supabase Database Setup
-- Run this SQL in your Supabase SQL Editor
-- =============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- ARTICLES TABLE
-- =============================================
CREATE TABLE articles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT,
    category TEXT NOT NULL DEFAULT 'news',
    slug TEXT UNIQUE NOT NULL,
    featured_image TEXT,
    author TEXT DEFAULT 'Vijay Maniyal',
    status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
    read_time INTEGER DEFAULT 5,
    trending BOOLEAN DEFAULT false,
    featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX idx_articles_slug ON articles(slug);
CREATE INDEX idx_articles_category ON articles(category);
CREATE INDEX idx_articles_status ON articles(status);
CREATE INDEX idx_articles_created_at ON articles(created_at DESC);

-- =============================================
-- CATEGORIES TABLE
-- =============================================
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    color TEXT DEFAULT '#1E3A5F',
    icon TEXT DEFAULT 'Newspaper',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default categories
INSERT INTO categories (name, slug, description, color, icon) VALUES
    ('News', 'news', 'Latest local news and breaking stories from KDMC', '#1E3A5F', 'Newspaper'),
    ('Announcements', 'announcements', 'Official announcements from municipal authorities', '#C41E3A', 'Megaphone'),
    ('Civic Updates', 'civic-updates', 'Infrastructure, services, and civic development news', '#2563EB', 'Building'),
    ('Public Notices', 'public-notices', 'Official public notices and legal announcements', '#D97706', 'FileText'),
    ('Events', 'events', 'Community events, festivals, and local happenings', '#059669', 'Calendar');

-- =============================================
-- SUBSCRIBERS TABLE (Newsletter)
-- =============================================
CREATE TABLE subscribers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    active BOOLEAN DEFAULT true
);

-- =============================================
-- SITE SETTINGS TABLE
-- =============================================
CREATE TABLE site_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    key TEXT UNIQUE NOT NULL,
    value TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default settings
INSERT INTO site_settings (key, value) VALUES
    ('site_name', 'KDMC News'),
    ('site_description', 'Your trusted source for local news from Kalyan-Dombivli'),
    ('editor_name', 'Vijay Maniyal'),
    ('editor_role', 'Editor & Publisher'),
    ('editor_bio', 'A passionate journalist covering local civic affairs.'),
    ('editor_avatar', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face'),
    ('editor_message', '"My mission is to bridge the gap between the municipal corporation and the citizens it serves."');

-- =============================================
-- ROW LEVEL SECURITY (RLS)
-- =============================================

-- Enable RLS on all tables
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- PUBLIC POLICIES (Read published content)
CREATE POLICY "Public can view published articles"
    ON articles FOR SELECT
    USING (status = 'published');

CREATE POLICY "Public can view categories"
    ON categories FOR SELECT
    USING (true);

CREATE POLICY "Public can view active subscribers"
    ON subscribers FOR SELECT
    USING (active = true);

CREATE POLICY "Public can view site settings"
    ON site_settings FOR SELECT
    USING (true);

-- ADMIN POLICIES (Full access for authenticated admin)
-- Note: Admin is identified by email - update the email to match your admin account
CREATE POLICY "Admin can manage articles"
    ON articles FOR ALL
    USING (
        auth.jwt() ->> 'email' = 'dreamydaisytales@gmail.com'
    );

CREATE POLICY "Admin can manage categories"
    ON categories FOR ALL
    USING (
        auth.jwt() ->> 'email' = 'dreamydaisytales@gmail.com'
    );

CREATE POLICY "Admin can manage subscribers"
    ON subscribers FOR ALL
    USING (
        auth.jwt() ->> 'email' = 'dreamydaisytales@gmail.com'
    );

CREATE POLICY "Admin can manage site settings"
    ON site_settings FOR ALL
    USING (
        auth.jwt() ->> 'email' = 'dreamydaisytales@gmail.com'
    );

-- PUBLIC CAN SUBSCRIBE (Insert into subscribers)
CREATE POLICY "Public can subscribe"
    ON subscribers FOR INSERT
    WITH CHECK (true);

-- =============================================
-- STORAGE BUCKET (For Images)
-- =============================================

-- Create bucket for article images (run in Supabase Dashboard > Storage)
-- Or use this SQL:
INSERT INTO storage.buckets (id, name, public)
VALUES ('article-images', 'article-images', true);

-- Create storage policy for public access to images
CREATE POLICY "Public can view article images"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'article-images');

CREATE POLICY "Authenticated users can upload article images"
    ON storage.objects FOR INSERT
    WITH CHECK (
        bucket_id = 'article-images' AND
        auth.role() = 'authenticated'
    );

CREATE POLICY "Admin can update article images"
    ON storage.objects FOR UPDATE
    USING (
        bucket_id = 'article-images' AND
        auth.jwt() ->> 'email' = 'dreamydaisytales@gmail.com'
    );

CREATE POLICY "Admin can delete article images"
    ON storage.objects FOR DELETE
    USING (
        bucket_id = 'article-images' AND
        auth.jwt() ->> 'email' = 'dreamydaisytales@gmail.com'
    );

-- =============================================
-- SAMPLE DATA (Optional - for testing)
-- =============================================

INSERT INTO articles (title, content, excerpt, category, slug, featured_image, status, featured, trending, read_time) VALUES
(
    'KDMC Launches New Digital Portal for Citizen Services',
    'In a significant step towards digital governance, the Kalyan-Dombivli Municipal Corporation (KDMC) has launched a new citizen services portal that promises to transform how residents interact with municipal authorities.

The portal, inaugurated by Mayor Mr. Rahul Mehta, offers over 150 services ranging from property tax payments to birth certificates, all accessible from the comfort of home.

## Key Features

- **24/7 Availability**: No more standing in queues during office hours
- **Real-time Status Tracking**: Track your applications instantly
- **Multiple Payment Options**: UPI, net banking, and card payments accepted
- **Document Upload**: Upload required documents digitally

> "This initiative aligns with our vision of making KDMC a smart city." - Mayor Rahul Mehta

The second phase, expected to launch within six months, will include road repair requests and community waste management services.',
    'The Kalyan-Dombivli Municipal Corporation has unveiled a comprehensive digital portal aimed at streamlining citizen services.',
    'civic-updates',
    'kdmc-launches-new-digital-portal-citizen-services',
    'https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?w=1200&h=600&fit=crop',
    'published',
    true,
    true,
    4
),
(
    'KDMC Begins Monsoon Preparation Drive for 2026',
    'As the monsoon season approaches, the Kalyan-Dombivli Municipal Corporation has launched a comprehensive preparation drive focusing on drainage system maintenance and emergency response coordination.

## Priority Areas

The civic body has identified 45 waterlogging-prone spots across Kalyan and Dombivli, which will be addressed before the monsoons arrive.

### Drainage Desilting
- Over 200 kilometers of storm drains to be cleaned
- 1,200 manpower deployed across zones

> "We learned from last year''s flooding incidents and have taken comprehensive measures." - Municipal Commissioner',
    'With the monsoon season approaching, municipal authorities have launched an extensive preparation drive.',
    'announcements',
    'monsoon-preparation-drive-kdmc-2026',
    'https://images.unsplash.com/photo-1502786129293-79981df4e689?w=1200&h=600&fit=crop',
    'published',
    false,
    true,
    3
),
(
    'Mumbai Metro Line 12 Gets Green Signal',
    'Great news for commuters! The Mumbai Metro Rail Corporation (MMRC) has announced the final approval for Metro Line 12, which will significantly improve connectivity between Kalyan-Dombivli and the rest of Mumbai.

## Project Details

- **Total Length**: 20.7 kilometers
- **Stations**: 17 stations from Kalyan to Kasarvadavali
- **Estimated Cost**: ₹8,739 crores
- **Expected Completion**: 2028

The metro will reduce travel time from Kalyan to Kasarvadavali to just 35 minutes.',
    'The long-awaited Mumbai Metro Line 12 connecting Kalyan to Kasarvadavali has received final approval.',
    'civic-updates',
    'new-metro-line-connectivity-kalyan-dombivli',
    'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1200&h=600&fit=crop',
    'published',
    true,
    true,
    5
);

-- =============================================
-- FUNCTION: Auto-update updated_at timestamp
-- =============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_articles_updated_at
    BEFORE UPDATE ON articles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_site_settings_updated_at
    BEFORE UPDATE ON site_settings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
