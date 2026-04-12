import Link from 'next/link';
import Image from 'next/image';
import { Article } from '@/app/lib/types';
import { formatDateShort, calculateReadTime } from '@/app/lib/utils';
import { getCategoryBySlug } from '@/app/lib/data';
import CategoryBadge from './CategoryBadge';

interface ArticleCardProps {
  article: Article;
  variant?: 'default' | 'featured' | 'horizontal' | 'compact';
}

export default function ArticleCard({ article, variant = 'default' }: ArticleCardProps) {
  const category = getCategoryBySlug(article.category);

  if (variant === 'featured') {
    return (
      <article className="group relative overflow-hidden rounded-2xl">
        <div className="relative aspect-[16/9] md:aspect-[21/9]">
          <Image
            src={article.featuredImage}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <CategoryBadge category={article.category} size="sm" />
          <Link href={`/article/${article.slug}`}>
            <h2 className="mt-3 text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-white leading-tight text-balance group-hover:text-accent-light transition-colors">
              {article.title}
            </h2>
          </Link>
          <p className="mt-3 text-gray-200 text-sm md:text-base line-clamp-2 max-w-3xl">
            {article.excerpt}
          </p>
          <div className="mt-4 flex items-center gap-4 text-sm text-gray-300">
            <span>{article.author}</span>
            <span>•</span>
            <span>{formatDateShort(article.publishedAt)}</span>
            <span>•</span>
            <span>{article.readTime} min read</span>
          </div>
        </div>
      </article>
    );
  }

  if (variant === 'horizontal') {
    return (
      <article className="group card overflow-hidden flex flex-col sm:flex-row">
        <div className="relative h-48 sm:h-auto sm:w-1/3">
          <Image
            src={article.featuredImage}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, 33vw"
          />
        </div>
        <div className="flex-1 p-5 flex flex-col">
          <CategoryBadge category={article.category} size="sm" />
          <Link href={`/article/${article.slug}`}>
            <h3 className="mt-2 text-lg font-serif font-bold text-gray-900 dark:text-white leading-snug group-hover:text-primary dark:group-hover:text-accent transition-colors line-clamp-2">
              {article.title}
            </h3>
          </Link>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-2 flex-1">
            {article.excerpt}
          </p>
          <div className="mt-4 flex items-center gap-3 text-xs text-gray-500 dark:text-gray-500">
            <span>{article.author}</span>
            <span>•</span>
            <span>{formatDateShort(article.publishedAt)}</span>
          </div>
        </div>
      </article>
    );
  }

  if (variant === 'compact') {
    return (
      <article className="group py-4 border-b border-gray-100 dark:border-slate-800 last:border-b-0">
        <div className="flex items-start gap-3">
          <div className="flex-1 min-w-0">
            <CategoryBadge category={article.category} size="xs" />
            <Link href={`/article/${article.slug}`}>
              <h3 className="mt-1 text-sm font-medium text-gray-900 dark:text-white leading-snug group-hover:text-primary dark:group-hover:text-accent transition-colors line-clamp-2">
                {article.title}
              </h3>
            </Link>
            <span className="mt-1 text-xs text-gray-500 dark:text-gray-500">
              {formatDateShort(article.publishedAt)}
            </span>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group card overflow-hidden">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={article.featuredImage}
          alt={article.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className="p-5">
        <CategoryBadge category={article.category} size="sm" />
        <Link href={`/article/${article.slug}`}>
          <h3 className="mt-2 text-lg font-serif font-bold text-gray-900 dark:text-white leading-snug group-hover:text-primary dark:group-hover:text-accent transition-colors line-clamp-2">
            {article.title}
          </h3>
        </Link>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
          {article.excerpt}
        </p>
        <div className="mt-4 flex items-center justify-between text-xs text-gray-500 dark:text-gray-500">
          <span>{article.author}</span>
          <div className="flex items-center gap-2">
            <span>{formatDateShort(article.publishedAt)}</span>
            <span>•</span>
            <span>{article.readTime} min</span>
          </div>
        </div>
      </div>
    </article>
  );
}
