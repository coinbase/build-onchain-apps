import '@radix-ui/themes/styles.css';
import '@/global.css';

import { ThemeProvider } from 'next-themes';
import { Theme } from '@radix-ui/themes';
import type { AppProps } from 'next/app';
import OnchainProviders from '@/onchain/OnchainProviders';

const themeValues = { light: 'light-theme', dark: 'dark-theme' };

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider disableTransitionOnChange attribute="class" value={themeValues}>
      <Theme accentColor="orange">
        <OnchainProviders>
          <Component {...pageProps} />
        </OnchainProviders>
      </Theme>
    </ThemeProvider>
  );
}
