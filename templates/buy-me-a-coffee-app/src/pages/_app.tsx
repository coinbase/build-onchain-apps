import '@radix-ui/themes/styles.css';
import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';

import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import { Theme } from '@radix-ui/themes';
import Web3Providers from './Web3Providers';

const themeValues = { light: 'light-theme', dark: 'dark-theme' };

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider disableTransitionOnChange attribute="class" value={themeValues}>
      <Theme accentColor="orange">
        <Web3Providers>
          <Component {...pageProps} />
        </Web3Providers>
      </Theme>
    </ThemeProvider>
  );
}
