import '@radix-ui/themes/styles.css';
import '../src/global.css';

import Head from 'next/head';
import { Theme } from '@radix-ui/themes';
import OnchainProviders from '../src/providers/OnchainProviders';
import { initAnalytics } from '../src/utils/analytics';
import type { AppProps } from 'next/app';

// Stat analytics before the App renders,
// so we can track page views and early events
initAnalytics();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <link rel="manifest" href="/manifest.json" />
      </Head>
      <OnchainProviders>
      <Theme
      appearance="dark"
>
          <Component {...pageProps} />
        </Theme>
      </OnchainProviders>
    </>
  );
}
