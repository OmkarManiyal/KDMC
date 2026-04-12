'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MessageCircle, Link as LinkIcon, Check } from 'lucide-react';
import { shareUrl, copyToClipboard } from '@/app/lib/utils';

interface ShareButtonsProps {
  url: string;
  title: string;
  size?: 'sm' | 'md';
}

export default function ShareButtons({ url, title, size = 'md' }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const handleCopy = async () => {
    await copyToClipboard(url);
    setCopied(true);
    setShowTooltip(true);
    setTimeout(() => {
      setCopied(false);
      setShowTooltip(false);
    }, 2000);
  };

  const sizeClasses = size === 'sm' ? 'w-8 h-8' : 'w-10 h-10';
  const iconSize = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5';

  return (
    <div className="flex items-center gap-2 relative">
      <span className="text-sm font-medium text-gray-600 dark:text-gray-400 mr-2">
        Share:
      </span>
      
      <a
        href={shareUrl('twitter', url, title)}
        target="_blank"
        rel="noopener noreferrer"
        className={`${sizeClasses} rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-slate-700 dark:hover:bg-slate-600 flex items-center justify-center text-gray-600 dark:text-gray-300 transition-colors`}
        aria-label="Share on Twitter"
      >
        <svg className={iconSize} fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
      </a>

      <a
        href={shareUrl('facebook', url, title)}
        target="_blank"
        rel="noopener noreferrer"
        className={`${sizeClasses} rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-slate-700 dark:hover:bg-slate-600 flex items-center justify-center text-gray-600 dark:text-gray-300 transition-colors`}
        aria-label="Share on Facebook"
      >
        <svg className={iconSize} fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
      </a>

      <a
        href={shareUrl('whatsapp', url, title)}
        target="_blank"
        rel="noopener noreferrer"
        className={`${sizeClasses} rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-slate-700 dark:hover:bg-slate-600 flex items-center justify-center text-gray-600 dark:text-gray-300 transition-colors`}
        aria-label="Share on WhatsApp"
      >
        <MessageCircle className={iconSize} />
      </a>

      <button
        onClick={handleCopy}
        className={`${sizeClasses} rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-slate-700 dark:hover:bg-slate-600 flex items-center justify-center text-gray-600 dark:text-gray-300 transition-colors relative`}
        aria-label="Copy link"
      >
        {copied ? (
          <Check className={`${iconSize} text-emerald-500`} />
        ) : (
          <LinkIcon className={iconSize} />
        )}
      </button>

      {showTooltip && (
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap animate-in">
          Link copied!
        </div>
      )}
    </div>
  );
}
