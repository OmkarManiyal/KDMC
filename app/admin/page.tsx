'use client';

import { FileText, FolderTree, Eye, TrendingUp, PlusCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { getTotalStats, getLatestArticles } from '@/app/lib/data';
import { formatDateShort } from '@/app/lib/utils';
import ArticleCard from '@/app/components/ArticleCard';

export default function AdminDashboard() {
  const stats = getTotalStats();
  const latestArticles = getLatestArticles(3);

  const statCards = [
    {
      label: 'Total Articles',
      value: stats.totalArticles,
      icon: FileText,
      color: 'bg-blue-500',
      href: '/admin/articles',
    },
    {
      label: 'Categories',
      value: stats.totalCategories,
      icon: FolderTree,
      color: 'bg-emerald-500',
      href: '/admin/categories',
    },
    {
      label: 'Published',
      value: stats.totalArticles,
      icon: Eye,
      color: 'bg-purple-500',
      href: '/',
    },
    {
      label: 'Drafts',
      value: stats.draftArticles,
      icon: TrendingUp,
      color: 'bg-amber-500',
      href: '/admin/articles?status=draft',
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <p className="mt-1 text-gray-500 dark:text-gray-400">
            Overview of your KDMC News portal
          </p>
        </div>
        <Link href="/admin/new" className="btn-primary flex items-center gap-2">
          <PlusCircle className="w-5 h-5" />
          New Article
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-slate-700 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {stat.label}
                </p>
                <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700">
        <div className="p-6 border-b border-gray-100 dark:border-slate-700 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Recent Articles
          </h2>
          <Link
            href="/admin/articles"
            className="text-sm text-primary dark:text-accent font-medium flex items-center gap-1 hover:gap-2 transition-all"
          >
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="p-6">
          {latestArticles.length > 0 ? (
            <div className="space-y-4">
              {latestArticles.map((article) => (
                <Link
                  key={article.id}
                  href={`/admin/articles/${article.id}`}
                  className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 dark:text-white truncate">
                      {article.title}
                    </p>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      {article.category} • {formatDateShort(article.publishedAt)}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      article.status === 'published'
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                        : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                    }`}
                  >
                    {article.status}
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <FileText className="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600" />
              <p className="mt-4 text-gray-500 dark:text-gray-400">
                No articles yet. Start by creating one!
              </p>
              <Link href="/admin/new" className="btn-primary mt-4 inline-block">
                Create Article
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <Link
              href="/admin/new"
              className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
            >
              <PlusCircle className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              <p className="mt-2 font-medium text-gray-900 dark:text-white">
                New Article
              </p>
            </Link>
            <Link
              href="/"
              className="p-4 rounded-lg bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
            >
              <Eye className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              <p className="mt-2 font-medium text-gray-900 dark:text-white">
                View Site
              </p>
            </Link>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            System Status
          </h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">Database</span>
              <span className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                Connected
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">Storage</span>
              <span className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                Available
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">API</span>
              <span className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                Operational
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
