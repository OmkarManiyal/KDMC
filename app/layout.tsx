import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";

export const metadata: Metadata = {
  metadataBase: new URL('https://kdmc.vercel.app'),
  title: {
    default: "KDMC News | Your Trusted Source for Kalyan-Dombivli Local News",
    template: "%s | KDMC News",
  },
  description:
    "Stay informed with the latest news, announcements, civic updates, and events from Kalyan-Dombivli Municipal Corporation. Your trusted local news source by Vijay Maniyal.",
  keywords: [
    "KDMC",
    "Kalyan",
    "Dombivli",
    "Municipal Corporation",
    "Local News",
    "Maharashtra",
    "Civic Updates",
    "News",
    "Announcements",
    "Public Notices",
    "Events",
    "Thane District",
    "Mumbai Metropolitan Region",
  ],
  authors: [{ name: "Vijay Maniyal", url: "https://kdmc.vercel.app" }],
  creator: "Vijay Maniyal",
  publisher: "KDMC News",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://kdmc.vercel.app",
    siteName: "KDMC News",
    title: "KDMC News | Your Trusted Source for Kalyan-Dombivli Local News",
    description:
      "Stay informed with the latest news, announcements, civic updates, and events from Kalyan-Dombivli Municipal Corporation.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "KDMC News Portal - Local News for Kalyan-Dombivli",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KDMC News | Local News for Kalyan-Dombivli",
    description:
      "Stay informed with the latest news from Kalyan-Dombivli Municipal Corporation.",
    images: ["/images/og-image.jpg"],
    creator: "@KDMCNews",
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
  alternates: {
    canonical: "https://kdmc.vercel.app",
    types: {
      "application/rss+xml": "/api/rss",
    },
  },
  category: "News",
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
        <link rel="apple-touch-icon" href="/images/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="alternate" type="application/rss+xml" title="KDMC News RSS Feed" href="/api/rss" />
        <meta name="theme-color" content="#1e3a8a" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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
      <body className="min-h-screen">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
