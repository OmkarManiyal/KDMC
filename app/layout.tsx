import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "KDMC News | Your Local News Portal",
    template: "%s | KDMC News",
  },
  description:
    "Stay informed with the latest news, announcements, and civic updates from Kalyan-Dombivli Municipal Corporation. Your trusted local news source by Vijay Maniyal.",
  keywords: [
    "KDMC",
    "Kalyan",
    "Dombivli",
    "Municipal Corporation",
    "Local News",
    "Maharashtra",
    "Civic Updates",
  ],
  authors: [{ name: "Vijay Maniyal" }],
  creator: "Vijay Maniyal",
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "KDMC News",
    title: "KDMC News | Your Local News Portal",
    description:
      "Stay informed with the latest news, announcements, and civic updates from Kalyan-Dombivli.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "KDMC News Portal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KDMC News | Your Local News Portal",
    description:
      "Stay informed with the latest news, announcements, and civic updates from Kalyan-Dombivli.",
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = localStorage.getItem('theme');
                if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-surface-light dark:bg-slate-900 transition-colors duration-200">
        {children}
      </body>
    </html>
  );
}
