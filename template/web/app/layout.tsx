import '@/global.css';

import { Roboto_Mono, Inter } from 'next/font/google';
import Footer from '@/components/footer/Footer';
import GoogleAnalytics from '@/components/GoogleAnalytics/GoogleAnalytics';
import OnchainProviders from '@/OnchainProviders';
import { initAnalytics } from '@/utils/analytics';
import type { Metadata } from 'next';

const roboto = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
});

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const viewport = {
  width: 'device-width',
  initialScale: 1.0,
};

export const metadata: Metadata = {
  manifest: '/manifest.json',
  other: {
    boat: '0.17.0',
  },
};

// Stat analytics before the App renders,
// so we can track page views and early events
initAnalytics();

/** Root layout to define the structure of every page
 * https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${roboto.variable} ${inter.variable}`}>
      <body className="flex flex-1 flex-col">
        <OnchainProviders>{children}</OnchainProviders>
        <Footer />
      </body>
      <GoogleAnalytics />
    </html>
  );
}
