import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  Header,
  Footer,
  ArticleCard,
  CategoryBadge,
  ShareButtons,
  Newsletter,
} from '@/app/components';
import {
  getAllArticles,
  getArticleBySlug,
  getRelatedArticles,
  getCategoryBySlug,
} from '@/app/lib/data';
import { siteSettings } from '@/app/lib/site-settings';
import { formatDate, formatDateTime } from '@/app/lib/utils';
import { ChevronRight, Clock, Calendar, User } from 'lucide-react';

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata(props: ArticlePageProps): Promise<Metadata> {
  const { slug } = await props.params;
  const article = getArticleBySlug(slug);
  
  if (!article) {
    return {
      title: 'Article Not Found',
    };
  }

  return {
    title: article.title,
    description: article.excerpt,
    authors: [{ name: article.author }],
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: [article.author],
      images: [
        {
          url: article.featuredImage,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: [article.featuredImage],
    },
  };
}

function ArticleContent({ content }: { content: string }) {
  const paragraphs = content.split('\n\n');
  
  return (
    <div className="prose-article">
      {paragraphs.map((para, index) => {
        if (para.startsWith('## ')) {
          return <h2 key={index} className="text-2xl font-serif font-bold text-primary dark:text-white mt-8 mb-4">{para.replace('## ', '')}</h2>;
        }
        if (para.startsWith('### ')) {
          return <h3 key={index} className="text-xl font-serif font-bold text-primary dark:text-white mt-6 mb-3">{para.replace('### ', '')}</h3>;
        }
        if (para.startsWith('> ')) {
          return <blockquote key={index} className="border-l-4 border-accent pl-4 italic text-gray-600 dark:text-gray-400 my-6">{para.replace('> ', '')}</blockquote>;
        }
        if (para.startsWith('- ')) {
          const items = para.split('\n').filter(line => line.startsWith('- '));
          return (
            <ul key={index} className="list-disc list-inside space-y-2 my-6">
              {items.map((item, i) => (
                <li key={i} className="text-gray-700 dark:text-gray-300">{item.replace('- ', '')}</li>
              ))}
            </ul>
          );
        }
        if (para.startsWith('| ')) {
          const rows = para.split('\n').filter(line => line.startsWith('|'));
          if (rows.length >= 2) {
            return (
              <div key={index} className="overflow-x-auto my-6">
                <table className="min-w-full border border-gray-200 dark:border-gray-700 rounded-lg">
                  <thead className="bg-gray-50 dark:bg-slate-800">
                    <tr>
                      {rows[0].split('|').filter(cell => cell.trim()).map((cell, i) => (
                        <th key={i} className="px-4 py-2 text-left text-sm font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700">
                          {cell.trim()}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {rows.slice(2).map((row, i) => (
                      <tr key={i} className="hover:bg-gray-50 dark:hover:bg-slate-800/50">
                        {row.split('|').filter(cell => cell.trim()).map((cell, j) => (
                          <td key={j} className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                            {cell.trim()}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          }
          return null;
        }
        if (para.match(/^\d+\.\s/)) {
          const items = para.split('\n').filter(line => line.match(/^\d+\.\s/));
          return (
            <ol key={index} className="list-decimal list-inside space-y-2 my-6">
              {items.map((item, i) => (
                <li key={i} className="text-gray-700 dark:text-gray-300">{item.replace(/^\d+\.\s/, '')}</li>
              ))}
            </ol>
          );
        }
        return <p key={index} className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">{para}</p>;
      })}
    </div>
  );
}

export default async function ArticlePage(props: ArticlePageProps) {
  const { slug } = await props.params;
  const article = getArticleBySlug(slug);
  
  if (!article) {
    notFound();
  }

  const category = getCategoryBySlug(article.category);
  const relatedArticles = getRelatedArticles(article.slug, article.category, 3);
  const articleUrl = `https://kdmc.news/article/${article.slug}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    description: article.excerpt,
    image: article.featuredImage,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: {
      '@type': 'Person',
      name: article.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'KDMC News',
      logo: {
        '@type': 'ImageObject',
        url: 'https://kdmc.news/images/logo.png',
      },
    },
  };

  return (
    <>
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="pt-24 pb-16">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
            <Link href="/" className="hover:text-primary dark:hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link 
              href={`/category/${article.category}`}
              className="hover:text-primary dark:hover:text-white transition-colors"
            >
              {category?.name || article.category}
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 dark:text-white truncate max-w-[200px]">
              {article.title}
            </span>
          </nav>

          <header className="mb-8">
            <CategoryBadge category={article.category} size="md" />
            <h1 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-gray-900 dark:text-white leading-tight text-balance">
              {article.title}
            </h1>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">
              {article.excerpt}
            </p>
            
            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-500">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <time dateTime={article.publishedAt}>
                  {formatDateTime(article.publishedAt)}
                </time>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{article.readTime} min read</span>
              </div>
            </div>
          </header>

          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-8">
            <Image
              src={article.featuredImage}
              alt={article.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 896px) 100vw, 896px"
            />
          </div>

          <div className="my-8">
            <ArticleContent content={article.content} />
          </div>

          <div className="py-8 border-t border-b border-gray-200 dark:border-gray-700">
            <ShareButtons url={articleUrl} title={article.title} />
          </div>

          <div className="my-12 p-6 bg-gray-50 dark:bg-slate-800/50 rounded-2xl">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src={siteSettings.editorAvatar}
                  alt={siteSettings.editorName}
                  width={64}
                  height={64}
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-500">Written by</p>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {siteSettings.editorName}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {siteSettings.editorRole}
                </p>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  {siteSettings.editorBio}
                </p>
              </div>
            </div>
          </div>
        </article>

        {relatedArticles.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
            <h2 className="section-title mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedArticles.map((related) => (
                <ArticleCard key={related.id} article={related} />
              ))}
            </div>
          </section>
        )}

        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <Newsletter />
        </section>
      </main>
      <Footer />
    </>
  );
}
