import '@radix-ui/themes/styles.css';
import '@/global.css';

import Head from 'next/head';
import { ThemeProvider } from 'next-themes';
import { Theme } from '@radix-ui/themes';
import OnchainProviders from '@/onchain/OnchainProviders';
import type { AppProps } from 'next/app';

const themeValues = { light: 'light-theme', dark: 'dark-theme' };

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <link rel="manifest" href="/manifest.json" />
      </Head>
      <ThemeProvider disableTransitionOnChange attribute="class" value={themeValues}>
        <Theme accentColor="orange">
          <OnchainProviders>
            <Component {...pageProps} />
          </OnchainProviders>
        </Theme>
      </ThemeProvider>
    </>
  );
}
