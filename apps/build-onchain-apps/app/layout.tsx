import '../src/global.css';

import OnchainProviders from '../src/providers/OnchainProviders';
import { initAnalytics } from '../src/utils/analytics';
import IncludeGoogleFonts from './includeGoogleFonts';
import type { Metadata } from 'next';

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <IncludeGoogleFonts />
      <body>
        <OnchainProviders>{children}</OnchainProviders>
      </body>
    </html>
  );
}
