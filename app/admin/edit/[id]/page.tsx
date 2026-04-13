'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/app/lib/supabase-client';
import { calculateReadTime } from '@/app/lib/utils';
import { Save, Eye, Image as ImageIcon, X, Check, Loader2, Upload, ArrowLeft } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category: string;
  featured_image: string;
  status: string;
  featured: boolean;
  trending: boolean;
}

export default function EditArticle() {
  const router = useRouter();
  const params = useParams();
  const articleId = params.id as string;
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [saved, setSaved] = useState(false);
  const [categories, setCategories] = useState<{ id: string; name: string; slug: string }[]>([]);
  const [article, setArticle] = useState<Article | null>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    category: 'news',
    featured_image: '',
    status: 'draft' as 'draft' | 'published',
    featured: false,
    trending: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient();
      
      const [articleRes, categoriesRes] = await Promise.all([
        supabase.from('articles').select('*').eq('id', articleId).single(),
        supabase.from('categories').select('*').order('name'),
      ]);

      if (articleRes.data) {
        setArticle(articleRes.data);
        setFormData({
          title: articleRes.data.title || '',
          slug: articleRes.data.slug || '',
          content: articleRes.data.content || '',
          excerpt: articleRes.data.excerpt || '',
          category: articleRes.data.category || 'news',
          featured_image: articleRes.data.featured_image || '',
          status: articleRes.data.status || 'draft',
          featured: articleRes.data.featured || false,
          trending: articleRes.data.trending || false,
        });
      }
      
      if (categoriesRes.data) {
        setCategories(categoriesRes.data);
      }
      
      setLoading(false);
    };

    fetchData();
  }, [articleId]);

  const handleTitleChange = (value: string) => {
    const slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    setFormData((prev) => ({
      ...prev,
      title: value,
      slug,
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    const supabase = createClient();

    const fileName = `${Date.now()}-${file.name}`;
    const { error } = await supabase.storage
      .from('article-images')
      .upload(fileName, file);

    if (!error) {
      const { data: urlData } = supabase.storage
        .from('article-images')
        .getPublicUrl(fileName);
      
      setFormData((prev) => ({
        ...prev,
        featured_image: urlData.publicUrl,
      }));
    }
    setUploadingImage(false);
  };

  const handleSubmit = async (publish: boolean) => {
    if (!article || !formData.title || !formData.content) return;
    
    setSaving(true);
    const supabase = createClient();

    const updatedArticle = {
      title: formData.title,
      slug: formData.slug,
      content: formData.content,
      excerpt: formData.excerpt || formData.content.substring(0, 200) + '...',
      category: formData.category,
      featured_image: formData.featured_image,
      status: publish ? 'published' : 'draft',
      featured: formData.featured,
      trending: formData.trending,
      read_time: calculateReadTime(formData.content),
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase
      .from('articles')
      .update(updatedArticle)
      .eq('id', articleId);

    if (!error) {
      setSaved(true);
      setTimeout(() => {
        router.push('/admin/articles');
        router.refresh();
      }, 1000);
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">Article not found</p>
        <Link href="/admin/articles" className="btn-primary mt-4 inline-block">
          Back to Articles
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/articles"
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Edit Article
            </h1>
            <p className="mt-1 text-gray-500 dark:text-gray-400">
              Update and manage your article
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {saved && (
            <span className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
              <Check className="w-5 h-5" />
              Saved!
            </span>
          )}
          {article.status === 'published' && (
            <Link
              href={`/news/${article.slug}`}
              target="_blank"
              className="btn-secondary flex items-center gap-2"
            >
              <Eye className="w-5 h-5" />
              View
            </Link>
          )}
          <button
            onClick={() => handleSubmit(false)}
            disabled={saving}
            className="btn-secondary flex items-center gap-2"
          >
            <Save className="w-5 h-5" />
            Save Draft
          </button>
          <button
            onClick={() => handleSubmit(true)}
            disabled={saving}
            className="btn-primary flex items-center gap-2"
          >
            {saving ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Check className="w-5 h-5" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 p-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Enter article title..."
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  URL Slug
                </label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, slug: e.target.value }))
                  }
                  placeholder="article-url-slug"
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-600 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Excerpt
                </label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, excerpt: e.target.value }))
                  }
                  placeholder="Brief summary of the article..."
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Content <span className="text-red-500">*</span>
                </label>
                <p className="text-xs text-gray-500 mb-2">
                  Use ## for headings, &gt; for quotes, - for bullet points
                </p>
                <textarea
                  value={formData.content}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, content: e.target.value }))
                  }
                  placeholder="Write your article content here..."
                  rows={20}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary font-mono text-sm resize-none"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              Settings
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, category: e.target.value }))
                  }
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.slug}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Featured Image
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                    disabled={uploadingImage}
                  />
                  <label
                    htmlFor="image-upload"
                    className={`flex items-center justify-center gap-2 w-full py-3 border-2 border-dashed border-gray-200 dark:border-slate-600 rounded-lg cursor-pointer hover:border-primary dark:hover:border-primary transition-colors ${
                      uploadingImage ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {uploadingImage ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="w-5 h-5 text-gray-400" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Upload Image
                        </span>
                      </>
                    )}
                  </label>
                </div>
                {formData.featured_image && (
                  <div className="mt-3 relative">
                    <img
                      src={formData.featured_image}
                      alt="Preview"
                      className="w-full aspect-video rounded-lg object-cover"
                    />
                    <button
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, featured_image: '' }))
                      }
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-3 pt-4 border-t border-gray-100 dark:border-slate-700">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        featured: e.target.checked,
                      }))
                    }
                    className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Featured article
                  </span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.trending}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        trending: e.target.checked,
                      }))
                    }
                    className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Trending
                  </span>
                </label>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              Preview
            </h3>
            <div className="text-sm text-gray-500 dark:text-gray-400 space-y-2">
              <p>
                <strong>Read time:</strong> {calculateReadTime(formData.content) || 0} min
              </p>
              <p>
                <strong>Characters:</strong> {formData.content.length}
              </p>
              <p>
                <strong>Words:</strong>{' '}
                {formData.content.split(/\s+/).filter(Boolean).length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
