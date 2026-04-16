import { getAllArticles } from '../lib/supabase-data';
import { format } from 'date-fns';

export const dynamic = 'force-dynamic';

export async function GET() {
  const articles = await getAllArticles();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kdmc.vercel.app';
  
  const rssItems = articles
    .slice(0, 20)
    .map((article) => {
      const pubDate = format(new Date(article.created_at), 'EEE, dd MMM yyyy HH:mm:ss GMT');
      const description = article.excerpt || article.content?.substring(0, 200) + '...' || '';
      const imageUrl = article.featured_image || '';
      
      return `
    <item>
      <title><![CDATA[${article.title}]]></title>
      <link>${baseUrl}/news/${article.slug}</link>
      <guid isPermaLink="true">${baseUrl}/news/${article.slug}</guid>
      <description><![CDATA[${description}]]></description>
      <pubDate>${pubDate}</pubDate>
      <category><![CDATA[${article.category}]]></category>
      ${imageUrl ? `<enclosure url="${imageUrl}" type="image/jpeg" />` : ''}
      <author>${article.author || 'KDMC News'}</author>
    </item>`;
    })
    .join('\n');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>KDMC News - Kalyan Dombivli Municipal Corporation News</title>
    <link>${baseUrl}</link>
    <description>Latest news and updates from Kalyan Dombivli Municipal Corporation (KDMC). Your trusted source for local municipal news, announcements, and community updates.</description>
    <language>en-IN</language>
    <managingEditor>dreamydaisytales@gmail.com (Vijay Maniyal)</managingEditor>
    <webMaster>dreamydaisytales@gmail.com (Vijay Maniyal)</webMaster>
    <lastBuildDate>${format(new Date(), 'EEE, dd MMM yyyy HH:mm:ss GMT')}</lastBuildDate>
    <atom:link href="${baseUrl}/api/rss" rel="self" type="application/rss+xml" />
    <image>
      <url>${baseUrl}/images/logo.png</url>
      <title>KDMC News</title>
      <link>${baseUrl}</link>
    </image>
    ${rssItems}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
