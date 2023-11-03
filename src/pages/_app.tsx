import '@/styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';

import type { AppProps } from 'next/app';

import Web3Providers from './Web3Providers';
 export default function App({ Component, pageProps }: AppProps) {
  return (
    <Web3Providers>
      <Component {...pageProps} />
    </Web3Providers>
  );
}
