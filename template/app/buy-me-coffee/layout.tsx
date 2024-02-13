import { generateMetadata } from '../../src/utils/generateMetadata';
import { DisableSSR } from './DisableSSR';

export const metadata = generateMetadata({
  title: 'Build Onchain Apps Toolkit',
  description: 'Build Onchain Applications with the best consumer experience in a few minutes.',
  images: 'themes.png',
  pathname: 'buy-me-coffee',
});

type BuyMeACoffeeLayoutProps = {
  children: React.ReactNode;
};

export default function BuyMeACoffeeLayout({ children }: BuyMeACoffeeLayoutProps) {
  return <DisableSSR>{children}</DisableSSR>;
}
