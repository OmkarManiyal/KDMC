'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Article } from '@/app/lib/types';
import { formatDateShort } from '@/app/lib/utils';
import CategoryBadge from './CategoryBadge';
import { useState } from 'react';

interface ArticleCardProps {
  article: Article;
  variant?: 'default' | 'featured' | 'horizontal' | 'compact';
}

function ArticleImage({ 
  src, 
  alt, 
  fill = false,
  className = '',
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
}: { 
  src: string | null | undefined; 
  alt: string; 
  fill?: boolean;
  className?: string;
  sizes?: string;
}) {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  if (!src || error) {
    return (
      <div className={`bg-gradient-to-br from-blue-900 to-blue-800 flex items-center justify-center ${className}`}>
        <span className="text-white/50 text-4xl">📰</span>
      </div>
    );
  }

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        className={`object-cover transition-transform duration-300 ${className} ${!loaded ? 'invisible' : 'visible'}`}
        sizes={sizes}
        onError={() => setError(true)}
        onLoad={() => setLoaded(true)}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={400}
      height={300}
      className={`object-cover ${className}`}
      onError={() => setError(true)}
    />
  );
}

export default function ArticleCard({ article, variant = 'default' }: ArticleCardProps) {
  const articleUrl = `/news/${article.slug}`;

  if (variant === 'featured') {
    return (
      <article className="group relative overflow-hidden rounded-2xl">
        <div className="relative aspect-[16/9] md:aspect-[21/9]">
          <ArticleImage
            src={article.featured_image}
            alt={article.title}
            fill
            className="group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <CategoryBadge category={article.category} size="sm" />
          <Link href={articleUrl}>
            <h2 className="mt-3 text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight text-balance group-hover:text-blue-200 transition-colors font-serif">
              {article.title}
            </h2>
          </Link>
          <p className="mt-3 text-gray-200 text-sm md:text-base line-clamp-2 max-w-3xl">
            {article.excerpt}
          </p>
          <div className="mt-4 flex items-center gap-4 text-sm text-gray-300 font-medium">
            <span>{article.author}</span>
            <span>•</span>
            <span>{formatDateShort(article.created_at)}</span>
            <span>•</span>
            <span>{article.read_time} min read</span>
          </div>
        </div>
      </article>
    );
  }

  if (variant === 'horizontal') {
    return (
      <article className="group bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 overflow-hidden flex flex-col sm:flex-row rounded-xl transition-all hover:shadow-lg">
        <div className="relative h-48 sm:h-auto sm:w-1/3">
          <ArticleImage
            src={article.featured_image}
            alt={article.title}
            fill
            className="group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, 33vw"
          />
        </div>
        <div className="flex-1 p-5 flex flex-col">
          <CategoryBadge category={article.category} size="sm" />
          <Link href={articleUrl}>
            <h3 className="mt-2 text-lg font-bold text-gray-900 dark:text-white leading-snug group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors line-clamp-2 font-serif">
              {article.title}
            </h3>
          </Link>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-2 flex-1 leading-relaxed">
            {article.excerpt}
          </p>
          <div className="mt-4 flex items-center gap-3 text-xs text-gray-600 dark:text-gray-400 font-medium">
            <span>{article.author}</span>
            <span>•</span>
            <span>{formatDateShort(article.created_at)}</span>
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
            <Link href={articleUrl}>
              <h3 className="mt-1 text-sm font-semibold text-gray-900 dark:text-gray-100 leading-snug group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                {article.title}
              </h3>
            </Link>
            <span className="mt-1 text-xs text-gray-600 dark:text-gray-400 font-medium">
              {formatDateShort(article.created_at)}
            </span>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 overflow-hidden rounded-xl transition-all hover:shadow-lg">
      <div className="relative h-48 overflow-hidden">
        <ArticleImage
          src={article.featured_image}
          alt={article.title}
          fill
          className="group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className="p-5">
        <CategoryBadge category={article.category} size="sm" />
        <Link href={articleUrl}>
          <h3 className="mt-2 text-lg font-bold text-gray-900 dark:text-white leading-snug group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors line-clamp-2 font-serif">
            {article.title}
          </h3>
        </Link>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-3 leading-relaxed">
          {article.excerpt}
        </p>
        <div className="mt-4 flex items-center justify-between text-xs text-gray-600 dark:text-gray-400 font-medium">
          <span className="font-semibold">{article.author}</span>
          <div className="flex items-center gap-2">
            <span>{formatDateShort(article.created_at)}</span>
            <span>•</span>
            <span>{article.read_time} min</span>
          </div>
        </div>
      </div>
    </article>
  );
}
