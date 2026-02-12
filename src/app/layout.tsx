import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from '@/components/ui/toaster';
import { Inter } from 'next/font/google';
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from '@vercel/speed-insights/next';
import SnowEffect from '@/components/shared/SnowEffect';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.petersthal.info'),
  title: {
    template: '%s | Petersthal',
    default: 'Petersthal',
  },
  description: 'Ihr Dorfportal für Petersthal - Veranstaltungen, Informationen und mehr über das Leben in Petersthal am Rottachsee.',
  icons: {
    icon: '/images/pLogo.png',
    shortcut: '/images/pLogo.png',
    apple: '/images/pLogo.png',
    other: [
      {
        rel: 'icon',
        url: '/favicon.ico',
      },
    ],
  },
  keywords: ['Petersthal', 'Rottachsee', 'Dorfleben', 'Veranstaltungen Petersthal', 'Vereine Petersthal'],
  authors: [{ name: 'Noah' }],
  openGraph: {
    title: 'Petersthal',
    description: 'Ihr Dorfportal für Petersthal - Veranstaltungen, Informationen und mehr.',
    url: 'https://www.petersthal.info',
    siteName: 'Petersthal',
    // Fügen Sie hier ein Bild für Social-Media-Vorschauen hinzu
    images: [
      {
        url: 'https://www.petersthal.info/images/pLogo.png', // Beispiel-URL
        width: 1200,
        height: 630,
      },
    ],
    locale: 'de_DE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Petersthal',
    description: 'Ihr Dorfportal für Petersthal - Veranstaltungen, Informationen und mehr.',
    // Fügen Sie hier ein Bild für Twitter-Vorschauen hinzu
    images: ['https://www.petersthal.info/images/twitter-image.png'], // Beispiel-URL
  },
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
};

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">
        <SnowEffect />
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <Toaster />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
