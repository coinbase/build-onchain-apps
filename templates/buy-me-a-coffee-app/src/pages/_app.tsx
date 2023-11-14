import '@radix-ui/themes/styles.css';
import './styles.css';
import '@rainbow-me/rainbowkit/styles.css';

import type { AppProps } from 'next/app';
import { CssLibPreferenceProvider } from '@/components/CssLibPreference';
import { ThemeProvider } from 'next-themes';
import { Theme } from '@radix-ui/themes';
import Web3Providers from './Web3Providers';


export default function App({ Component, pageProps }: AppProps) {
  return (
    <CssLibPreferenceProvider>
      <ThemeProvider
        disableTransitionOnChange
        attribute="class"
        value={{ light: 'light-theme', dark: 'dark-theme' }}
        defaultTheme="system"
      >
        <Web3Providers>
          <Theme accentColor="indigo">
            <Component {...pageProps} />
          </Theme>
        </Web3Providers>
      </ThemeProvider>
    </CssLibPreferenceProvider>
  );
}
