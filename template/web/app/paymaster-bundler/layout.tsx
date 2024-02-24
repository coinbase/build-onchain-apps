import { generateMetadata } from '@/utils/generateMetadata';

export const metadata = generateMetadata({
  title: 'Paymaster Bundler - BOAT',
  description:
    'Save weeks of initial app setup and the hassle of integrating onchain components with web2 infrastructure.',
  images: 'themes.png',
  pathname: 'paymaster-bundler',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
