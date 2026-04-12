# KDMC News Portal - Specification

## Concept & Vision

A hyperlocal digital news portal for KDMC (Kalyan Dombivli Municipal Corporation) that positions Vijay Maniyal as the trusted voice of the community. The design blends traditional newspaper credibility with modern digital aesthetics—think "The Guardian meets local community board." Fast, authoritative, and deeply personal.

## Design Language

### Aesthetic Direction
Editorial newspaper meets modern digital—clean typography, generous whitespace, card-based layouts with subtle depth. Professional gravitas with approachable warmth.

### Color Palette
```css
--primary: #1E3A5F;        /* Deep navy - authority, trust */
--primary-light: #2D5A8A;  /* Lighter navy for hover */
--accent: #C41E3A;         /* Crimson red - urgency, news */
--accent-light: #E63950;   /* Hover state */
--background: #FAFBFC;     /* Off-white paper texture feel */
--surface: #FFFFFF;        /* Card backgrounds */
--text-primary: #1A1A2E;   /* Near-black for readability */
--text-secondary: #64748B; /* Muted gray for metadata */
--border: #E2E8F0;         /* Subtle borders */
--dark-bg: #0F172A;        /* Dark mode background */
--dark-surface: #1E293B;   /* Dark mode cards */
--dark-text: #F1F5F9;      /* Dark mode text */
```

### Typography
- **Headlines**: Playfair Display (serif) - 700 weight, editorial authority
- **Body**: Source Sans 3 (sans-serif) - 400/600, excellent readability
- **Accent/Labels**: JetBrains Mono - categories, dates, small labels

### Spatial System
- Base unit: 4px
- Content max-width: 1280px
- Article content: 720px for optimal reading
- Card padding: 24px
- Section gaps: 64px (desktop), 48px (mobile)

### Motion Philosophy
- Subtle fade-in on scroll (opacity 0→1, 300ms ease-out)
- Card hover: translateY(-4px), shadow elevation, 200ms ease
- Page transitions: 150ms fade
- Dark mode toggle: smooth 200ms color transitions
- No distracting animations—performance first

### Visual Assets
- Icons: Lucide React (consistent, lightweight)
- Images: Optimized via next/image with blur placeholders
- Decorative: Subtle gradient overlays on hero, thin accent lines as dividers

## Layout & Structure

### Homepage Structure
```
┌─────────────────────────────────────────────────────────┐
│  Header: Logo | Category Nav | Search | Dark Mode      │
├─────────────────────────────────────────────────────────┤
│  Breaking News Ticker (if any)                          │
├─────────────────────────────────────────────────────────┤
│  Hero Section                                           │
│  ┌─────────────────────┬───────────────────────────┐   │
│  │  Vijay's Profile     │  Featured Article         │   │
│  │  Photo + Bio         │  Large image + headline   │   │
│  │  "From the Editor"   │                           │   │
│  │  CTA Buttons         │                           │   │
│  └─────────────────────┴───────────────────────────┘   │
├─────────────────────────────────────────────────────────┤
│  Trending Section (3-4 cards horizontal)                │
├─────────────────────────────────────────────────────────┤
│  Latest News Grid (3 columns, latest 6 articles)        │
├─────────────────────────────────────────────────────────┤
│  Categories Showcase (horizontal scroll cards)          │
├─────────────────────────────────────────────────────────┤
│  Newsletter Subscription                                │
├─────────────────────────────────────────────────────────┤
│  Footer: Links | Copyright | Social                      │
└─────────────────────────────────────────────────────────┘
```

### Category Page Structure
- Category header with icon and description
- Filtered article grid
- Load more / pagination

### Article Page Structure
```
┌─────────────────────────────────────────────────────────┐
│  Breadcrumb: Home > Category > Article                   │
├─────────────────────────────────────────────────────────┤
│  Article Header: Category | Date | Read time            │
│  Title (H1)                                             │
│  Author: Vijay Maniyal + avatar                          │
├─────────────────────────────────────────────────────────┤
│  Featured Image (full-width, optimized)                 │
├─────────────────────────────────────────────────────────┤
│  Article Content (720px max, good line-height)           │
│  - Paragraphs                                           │
│  - Subheadings                                          │
│  - Blockquotes                                          │
│  - Images with captions                                 │
├─────────────────────────────────────────────────────────┤
│  Share Buttons (WhatsApp, Twitter, Facebook, Copy)      │
├─────────────────────────────────────────────────────────┤
│  Author Bio Card (Vijay's expanded profile)            │
├─────────────────────────────────────────────────────────┤
│  Related Articles (3 cards)                             │
├─────────────────────────────────────────────────────────┤
│  Comments Section (if enabled)                          │
└─────────────────────────────────────────────────────────┘
```

### Admin Dashboard Structure
```
┌──────────┬──────────────────────────────────────────────┐
│ Sidebar  │  Main Content Area                           │
│ - Dashboard│  - Stats overview                          │
│ - Articles │  - Article list with actions               │
│ - New Post │  - New/Edit article form                   │
│ - Categories│ - Category management                     │
│ - Settings │                                           │
│ - Logout   │                                           │
└──────────┴──────────────────────────────────────────────┘
```

## Features & Interactions

### Core Features

**1. Homepage**
- Hero with Vijay's profile photo (circular, 200px)
- Animated greeting text
- CTA: "Latest News" scrolls to news section, "Announcements" goes to category
- Featured article carousel (auto-rotate every 8s, pause on hover)

**2. Navigation**
- Sticky header on scroll (shrinks from 80px to 64px)
- Category dropdown on hover
- Mobile: hamburger menu with slide-in drawer
- Active category highlighted

**3. Search**
- Click search icon → expands search input (width animation)
- Real-time filtering as user types
- Results show title + category + date
- Empty state: "No articles found for '[query]'"

**4. Dark Mode**
- Toggle in header (sun/moon icon)
- Persists in localStorage
- Smooth color transitions (200ms)
- Respects system preference initially

**5. Article Cards**
- Hover: lift + shadow
- Click: navigate to article
- Category badge (colored by category)
- Read time estimate
- Share icon (opens share options)

**6. Newsletter**
- Email input + subscribe button
- Validation: valid email format
- Success: "Thanks for subscribing!"
- Error: "Please enter a valid email"

### Admin Features

**1. Dashboard**
- Total articles count
- Published vs drafts
- Recent activity list
- Quick actions

**2. Article Management**
- List view with title, category, date, status
- Actions: Edit, Delete, Toggle Publish
- Bulk select for delete
- Search/filter by category

**3. Article Editor**
- Title input (required)
- Slug auto-generated, editable
- Category dropdown
- Featured image upload (drag & drop)
- Content editor (simple textarea with markdown support)
- Publish/Save Draft buttons
- Preview button

**4. Category Management**
- Add/edit/delete categories
- Each category: name, slug, icon, description

### Edge Cases
- No articles: "No articles yet. Start by creating one!"
- Image load fail: Show placeholder gradient
- Network error: Toast notification with retry
- Empty search: Helpful empty state
- Long titles: Truncate with ellipsis (3 lines max)

## Component Inventory

### Header
- **Default**: White bg, full logo, all nav items visible
- **Scrolled**: Slight shadow, reduced height, sticky
- **Mobile**: Hamburger menu, collapsible nav
- **Dark mode**: Dark surface background

### ArticleCard
- **Default**: White card, image, title, meta, category badge
- **Hover**: translateY(-4px), elevated shadow
- **Featured**: Larger, horizontal layout on desktop
- **Loading**: Skeleton with pulse animation

### CategoryBadge
- News: Navy background
- Announcements: Red background
- Civic Updates: Blue background
- Public Notices: Orange background
- Events: Green background

### Button
- **Primary**: Navy bg, white text
- **Secondary**: White bg, navy border, navy text
- **Accent**: Red bg, white text
- **Hover**: Darken bg 10%
- **Disabled**: 50% opacity, no pointer

### SearchBar
- **Default**: Collapsed, just search icon
- **Expanded**: Full width input with X to close
- **With results**: Dropdown with matches

### Newsletter Form
- **Default**: Input + button inline
- **Loading**: Button shows spinner
- **Success**: Green checkmark, "Subscribed!"
- **Error**: Red border on input, error message

### Admin Sidebar
- **Default**: 250px width
- **Collapsed**: 64px, icons only
- **Active item**: Accent left border

## Technical Approach

### Stack
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS 3.4
- **Icons**: Lucide React
- **Fonts**: Google Fonts (Playfair Display, Source Sans 3)
- **State**: React hooks (useState, useEffect)
- **Storage**: JSON file-based CMS (simple, no database needed)
- **Deployment**: Static export possible

### Data Model

```typescript
interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string; // Markdown
  category: Category;
  featuredImage: string;
  author: Author;
  publishedAt: string;
  updatedAt: string;
  readTime: number;
  status: 'draft' | 'published';
  featured: boolean;
  trending: boolean;
}

interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  color: string;
  icon: string;
}

interface Author {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
}

interface Subscriber {
  email: string;
  subscribedAt: string;
}
```

### API Endpoints

```
GET    /api/articles          - List articles (filterable)
GET    /api/articles/[slug]   - Get single article
POST   /api/articles          - Create article
PUT    /api/articles/[id]     - Update article
DELETE /api/articles/[id]     - Delete article

GET    /api/categories        - List categories
POST   /api/categories        - Create category
PUT    /api/categories/[id]   - Update category
DELETE /api/categories/[id]   - Delete category

POST   /api/newsletter        - Subscribe email
GET    /api/search?q=         - Search articles
```

### SEO Implementation
- Dynamic meta tags per page
- Open Graph images
- JSON-LD schema for articles
- Auto-generated sitemap.xml
- robots.txt
- Semantic HTML (article, header, main, nav, aside)

### Performance Targets
- Lighthouse Performance: 90+
- First Contentful Paint: <1.5s
- Largest Contentful Paint: <2.5s
- Cumulative Layout Shift: <0.1
- Image optimization via next/image
- Font display: swap
- Minimal JavaScript bundle
