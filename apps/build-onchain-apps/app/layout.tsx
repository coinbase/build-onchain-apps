import '../src/global.css';

import { Roboto_Mono, Inter } from 'next/font/google';
import OnchainProviders from '../src/providers/OnchainProviders';
import { initAnalytics } from '../src/utils/analytics';
import type { Metadata } from 'next';

const roboto = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap'
});

const inter = Inter({
  subsets: ['latin'],
  display: 'swap'
});

export const viewport = {
  width: 'device-width',
  initialScale: 1.0,
};

export const metadata: Metadata = {
  manifest: '/manifest.json',
};

// Stat analytics before the App renders,
// so we can track page views and early events
initAnalytics();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en" className={`${roboto.className} ${inter.className}`}>
      <body>
        <OnchainProviders>
          {children}
        </OnchainProviders>
      </body>
    </html>
  );
}
