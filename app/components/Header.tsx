'use client';

import Link from 'next/link';
import { siteSettings } from '@/app/lib/site-settings';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Menu, X, Search, Moon, Sun, Newspaper } from 'lucide-react';
import SearchBar from './SearchBar';
import { createClient } from '@/app/lib/supabase-client';
import { Category } from '@/app/lib/types';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const pathname = usePathname();

  useEffect(() => {
    async function fetchCategories() {
      const supabase = createClient();
      const { data } = await supabase
        .from('categories')
        .select('*')
        .order('name', { ascending: true });
      if (data) {
        setCategories(data);
      }
    }
    fetchCategories();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    const checkDarkMode = () => {
      const isDarkMode = document.documentElement.classList.contains('dark');
      setIsDark(isDarkMode);
    };
    
    checkDarkMode();
    
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['class'] 
    });
    
    return () => observer.disconnect();
  }, []);

  const toggleDarkMode = () => {
    const willBeDark = !isDark;
    setIsDark(willBeDark);
    
    if (willBeDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/98 dark:bg-slate-900/98 backdrop-blur-sm shadow-sm border-b border-gray-200 dark:border-slate-700 py-3'
          : 'bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center group-hover:bg-primary-light transition-colors">
              <Newspaper className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-xl font-serif font-bold text-gray-900 dark:text-white">
                {siteSettings.site_name}
              </span>
              <span className="hidden sm:block text-xs text-gray-500 dark:text-slate-400">
                by {siteSettings.editor_name}
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            <Link
              href="/"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === '/'
                  ? 'text-accent bg-accent/10'
                  : 'text-gray-700 dark:text-slate-300 hover:text-primary dark:hover:text-white hover:bg-gray-50 dark:hover:bg-slate-800'
              }`}
            >
              Home
            </Link>
            {categories.slice(0, 5).map((category) => (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname === `/category/${category.slug}`
                    ? 'text-accent bg-accent/10'
                    : 'text-gray-700 dark:text-slate-300 hover:text-primary dark:hover:text-white hover:bg-gray-50 dark:hover:bg-slate-800'
                }`}
              >
                {category.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 rounded-lg text-gray-600 dark:text-slate-400 hover:text-primary dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg text-gray-600 dark:text-slate-400 hover:text-primary dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-600 dark:text-slate-400 hover:text-primary dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {isSearchOpen && (
          <div className="mt-4 animate-in">
            <SearchBar onClose={() => setIsSearchOpen(false)} />
          </div>
        )}

        <nav
          className={`lg:hidden mt-4 pb-4 border-t border-gray-200 dark:border-slate-700 ${
            isMobileMenuOpen ? 'block' : 'hidden'
          }`}
        >
          <div className="flex flex-col gap-1 pt-4">
            <Link
              href="/"
              className={`px-4 py-2.5 rounded-lg font-medium transition-colors ${
                pathname === '/'
                  ? 'bg-primary text-white'
                  : 'text-gray-800 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800'
              }`}
            >
              Home
            </Link>
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
                className={`px-4 py-2.5 rounded-lg font-medium transition-colors ${
                  pathname === `/category/${category.slug}`
                    ? 'bg-primary text-white'
                    : 'text-gray-800 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800'
                }`}
              >
                {category.name}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}
