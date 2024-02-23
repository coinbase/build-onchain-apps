import { generateMetadata } from '@/utils/generateMetadata';

export const metadata = generateMetadata({
  title: 'Build Onchain Apps Toolkit',
  description: 'Build Onchain Applications with the best consumer experience in a few minutes.',
  images: 'themes.png',
  pathname: 'buy-me-coffee',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
