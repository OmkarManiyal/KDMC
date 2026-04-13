'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/app/lib/supabase-client';
import { formatDateShort } from '@/app/lib/utils';
import { PlusCircle, FileText, Eye, TrendingUp, FolderTree, ArrowRight, Loader2 } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  category: string;
  status: string;
  created_at: string;
  slug: string;
  featured: boolean;
  trending: boolean;
}

export default function AdminDashboard() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    published: 0,
    drafts: 0,
    trending: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient();
      
      const { data: articlesData, error } = await supabase
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && articlesData) {
        setArticles(articlesData);
        setStats({
          total: articlesData.length,
          published: articlesData.filter((a) => a.status === 'published').length,
          drafts: articlesData.filter((a) => a.status === 'draft').length,
          trending: articlesData.filter((a) => a.trending).length,
        });
      }
      
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  const statCards = [
    {
      label: 'Total Articles',
      value: stats.total,
      icon: FileText,
      color: 'bg-blue-500',
    },
    {
      label: 'Published',
      value: stats.published,
      icon: Eye,
      color: 'bg-emerald-500',
    },
    {
      label: 'Drafts',
      value: stats.drafts,
      icon: FileText,
      color: 'bg-amber-500',
    },
    {
      label: 'Trending',
      value: stats.trending,
      icon: TrendingUp,
      color: 'bg-purple-500',
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
            Welcome to KDMC News Admin Panel
          </p>
        </div>
        <Link href="/admin/new" className="btn-primary flex items-center gap-2">
          <PlusCircle className="w-5 h-5" />
          New Article
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => (
          <div
            key={stat.label}
            className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-slate-700"
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
          </div>
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
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-slate-700/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
              {articles.slice(0, 5).map((article) => (
                <tr
                  key={article.id}
                  className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-900 dark:text-white line-clamp-1">
                      {article.title}
                    </p>
                    <div className="mt-1 flex gap-2">
                      {article.featured && (
                        <span className="px-2 py-0.5 bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 rounded text-xs">
                          Featured
                        </span>
                      )}
                      {article.trending && (
                        <span className="px-2 py-0.5 bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 rounded text-xs">
                          Trending
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="capitalize text-sm text-gray-600 dark:text-gray-400">
                      {article.category.replace('-', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        article.status === 'published'
                          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                          : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                      }`}
                    >
                      {article.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {formatDateShort(article.created_at)}
                  </td>
                </tr>
              ))}
              {articles.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center">
                    <FileText className="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600" />
                    <p className="mt-4 text-gray-500 dark:text-gray-400">
                      No articles yet. Start by creating one!
                    </p>
                    <Link href="/admin/new" className="btn-primary mt-4 inline-block">
                      Create Article
                    </Link>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Link
          href="/admin/new"
          className="p-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl text-white hover:shadow-lg transition-shadow"
        >
          <PlusCircle className="w-10 h-10 mb-4" />
          <h3 className="text-lg font-semibold">Create New Article</h3>
          <p className="mt-2 text-white/80 text-sm">
            Write and publish a new article for your readers
          </p>
        </Link>
        <Link
          href="/"
          target="_blank"
          className="p-6 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl text-white hover:shadow-lg transition-shadow"
        >
          <Eye className="w-10 h-10 mb-4" />
          <h3 className="text-lg font-semibold">View Website</h3>
          <p className="mt-2 text-white/80 text-sm">
            Preview your website as visitors see it
          </p>
        </Link>
      </div>
    </div>
  );
}
