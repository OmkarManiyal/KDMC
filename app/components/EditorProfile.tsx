import Image from 'next/image';
import Link from 'next/link';
import { MessageCircle, Globe } from 'lucide-react';
import { siteSettings } from '@/app/lib/site-settings';

export default function EditorProfile() {
  return (
    <div className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl p-8 text-white">
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="relative">
          <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white/20 shadow-xl">
            <Image
              src={siteSettings.editorAvatar}
              alt={siteSettings.editorName}
              width={160}
              height={160}
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-accent rounded-full flex items-center justify-center shadow-lg">
            <span className="text-xs font-bold">Editor</span>
          </div>
        </div>
        <div className="flex-1 text-center md:text-left">
          <p className="text-accent-light font-mono text-sm uppercase tracking-wider">
            From the Editor
          </p>
          <h2 className="mt-2 text-3xl font-serif font-bold">
            {siteSettings.editorName}
          </h2>
          <p className="text-white/80 text-sm mt-1">
            {siteSettings.editorRole}
          </p>
          <blockquote className="mt-4 text-white/90 italic border-l-4 border-accent pl-4">
            {siteSettings.editorMessage}
          </blockquote>
          <p className="mt-4 text-sm text-white/70 max-w-xl">
            {siteSettings.editorBio}
          </p>
          <div className="mt-6 flex items-center justify-center md:justify-start gap-3">
            {siteSettings.socialLinks.twitter && (
              <a
                href={siteSettings.socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
            )}
            {siteSettings.socialLinks.facebook && (
              <a
                href={siteSettings.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
            )}
            {siteSettings.socialLinks.whatsapp && (
              <a
                href={siteSettings.socialLinks.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
