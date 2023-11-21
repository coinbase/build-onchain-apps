import '@radix-ui/themes/styles.css';
import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';

import { ThemeProvider } from 'next-themes';
import { Theme } from '@radix-ui/themes';
import OnchainProviders from '../onchain/OnchainProviders';
import type { AppProps } from 'next/app';

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
