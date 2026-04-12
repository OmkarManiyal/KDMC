'use client';

import { useState } from 'react';
import { Send, Check, AlertCircle, Loader2 } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setStatus('error');
      setError('Please enter your email address');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus('error');
      setError('Please enter a valid email address');
      return;
    }

    setStatus('loading');
    
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 1500);
  };

  return (
    <section className="bg-gradient-to-r from-primary via-primary-light to-primary rounded-2xl p-8 md:p-12 text-white">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-serif font-bold">
          Stay Informed
        </h2>
        <p className="mt-3 text-white/80">
          Get the latest news, announcements, and civic updates delivered to your inbox. No spam, unsubscribe anytime.
        </p>
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <div className="flex-1 relative">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setStatus('idle');
                  setError('');
                }}
                placeholder="your.email@example.com"
                className={`w-full px-4 py-3 rounded-lg bg-white/10 border-2 ${
                  status === 'error' ? 'border-accent' : 'border-white/20'
                } placeholder-white/50 text-white focus:outline-none focus:border-white/50 transition-colors`}
              />
              {status === 'error' && (
                <div className="absolute -bottom-6 left-0 flex items-center gap-1 text-accent-light text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>{error}</span>
                </div>
              )}
            </div>
            <button
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              className={`px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all ${
                status === 'success'
                  ? 'bg-emerald-500 text-white'
                  : 'bg-white text-primary hover:bg-white/90'
              } disabled:opacity-70`}
            >
              {status === 'loading' && (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Subscribing...
                </>
              )}
              {status === 'success' && (
                <>
                  <Check className="w-5 h-5" />
                  Subscribed!
                </>
              )}
              {(status === 'idle' || status === 'error') && (
                <>
                  Subscribe
                  <Send className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </form>
        <p className="mt-8 text-sm text-white/60">
          By subscribing, you agree to receive emails from KDMC News. We respect your privacy.
        </p>
      </div>
    </section>
  );
}
