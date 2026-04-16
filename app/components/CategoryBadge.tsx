import Link from 'next/link';
import { Newspaper, Megaphone, Building, FileText, Calendar, TrendingUp, Flame } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Newspaper: <Newspaper className="w-4 h-4" />,
  Megaphone: <Megaphone className="w-4 h-4" />,
  Building: <Building className="w-4 h-4" />,
  FileText: <FileText className="w-4 h-4" />,
  Calendar: <Calendar className="w-4 h-4" />,
  TrendingUp: <TrendingUp className="w-4 h-4" />,
  Flame: <Flame className="w-4 h-4" />,
};

interface CategoryBadgeProps {
  category: string;
  size?: 'xs' | 'sm' | 'md';
  showIcon?: boolean;
}

const categoryStyles: Record<string, { bg: string; text: string }> = {
  news: { bg: 'bg-blue-900 dark:bg-blue-800', text: 'text-white' },
  announcements: { bg: 'bg-red-700 dark:bg-red-800', text: 'text-white' },
  'civic-updates': { bg: 'bg-blue-600 dark:bg-blue-700', text: 'text-white' },
  'public-notices': { bg: 'bg-amber-600 dark:bg-amber-700', text: 'text-white' },
  events: { bg: 'bg-emerald-600 dark:bg-emerald-700', text: 'text-white' },
};

const categoryIcons: Record<string, string> = {
  news: 'Newspaper',
  announcements: 'Megaphone',
  'civic-updates': 'Building',
  'public-notices': 'FileText',
  events: 'Calendar',
};

export default function CategoryBadge({ category, size = 'sm', showIcon = false }: CategoryBadgeProps) {
  const styles = categoryStyles[category] || { bg: 'bg-gray-600 dark:bg-gray-700', text: 'text-white' };
  const icon = categoryIcons[category] || 'Newspaper';
  const displayIcon = showIcon ? iconMap[icon] : null;

  const sizeClasses = {
    xs: 'px-2 py-0.5 text-[10px]',
    sm: 'px-3 py-1 text-xs',
    md: 'px-4 py-1.5 text-sm',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-mono font-semibold uppercase tracking-wider ${styles.bg} ${styles.text} ${sizeClasses[size]}`}
    >
      {displayIcon}
      {category.replace('-', ' ')}
    </span>
  );
}

interface CategoryCardProps {
  name: string;
  slug: string;
  description: string;
  color: string;
  icon: string;
  articleCount?: number;
}

export function CategoryCard({ name, slug, description, color, icon, articleCount }: CategoryCardProps) {
  return (
    <Link
      href={`/category/${slug}`}
      className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 flex items-start gap-4 rounded-xl transition-all hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-600"
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: `${color}20` }}
      >
        <span style={{ color }}>{iconMap[icon] || iconMap.Newspaper}</span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-gray-900 dark:text-white text-lg group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">
            {name}
          </h3>
          {articleCount !== undefined && (
            <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">
              {articleCount} articles
            </span>
          )}
        </div>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
          {description}
        </p>
      </div>
    </Link>
  );
}
