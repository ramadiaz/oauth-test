import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  // Basic metadata
  title: {
    default: "Google OAuth Tester - Test Your OAuth Integration",
    template: "%s | Google OAuth Tester"
  },
  description: "Free Google OAuth testing tool. Test your Google OAuth 2.0 integration, view token responses, and debug authentication flows with our developer-friendly interface.",
  
  // Keywords for SEO
  keywords: [
    "Google OAuth",
    "OAuth 2.0",
    "Google authentication",
    "OAuth testing tool",
    "Google login integration",
    "OAuth debugger",
    "Google API authentication",
    "OAuth token tester",
    "Google OAuth playground",
    "authentication testing"
  ],
  
  // Author and creator info
  authors: [{ name: "OAuth Tester Team" }],
  creator: "OAuth Tester",
  publisher: "OAuth Tester",
  
  // Application info
  applicationName: "Google OAuth Tester",
  category: "Developer Tools",
  
  // Viewport and mobile optimization
  viewport: "width=device-width, initial-scale=1",
  
  // Language and locale
  language: "en-US",
  
  // Robots and indexing
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  // Open Graph metadata for social sharing
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://your-domain.com',
    siteName: 'Google OAuth Tester',
    title: 'Google OAuth Tester - Test Your OAuth Integration',
    description: 'Free Google OAuth testing tool. Test your Google OAuth 2.0 integration, view token responses, and debug authentication flows with our developer-friendly interface.',
    images: [
      {
        url: '/og-image.jpg', // You'll need to create this image (1200x630px recommended)
        width: 1200,
        height: 630,
        alt: 'Google OAuth Tester - Developer Tool',
      }
    ],
  },
  
  // Twitter Card metadata
  twitter: {
    card: 'summary_large_image',
    site: '@yourtwitterhandle', // Replace with your Twitter handle
    creator: '@yourtwitterhandle',
    title: 'Google OAuth Tester - Test Your OAuth Integration',
    description: 'Free Google OAuth testing tool. Test your Google OAuth 2.0 integration, view token responses, and debug authentication flows.',
    images: ['/twitter-card.jpg'], // You'll need to create this image (1200x600px recommended)
  },
  
  // Additional metadata
  manifest: '/manifest.json', // You'll need to create this PWA manifest
  
  // Verification for search engines (replace with your actual verification codes)
  verification: {
    google: 'your-google-verification-code',
    // bing: 'your-bing-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
  
  // Canonical URL
  alternates: {
    canonical: 'https://your-domain.com',
  },
  
  // Additional meta tags
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'apple-mobile-web-app-title': 'OAuth Tester',
    'mobile-web-app-capable': 'yes',
    'theme-color': '#4f46e5',
    'msapplication-TileColor': '#4f46e5',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Additional head elements for better SEO */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#4f46e5" />
        
        {/* Structured Data for better search results */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Google OAuth Tester",
              "description": "Free Google OAuth testing tool for developers",
              "url": "https://your-domain.com",
              "applicationCategory": "DeveloperApplication",
              "operatingSystem": "Any",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "author": {
                "@type": "Organization",
                "name": "OAuth Tester Team"
              }
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}