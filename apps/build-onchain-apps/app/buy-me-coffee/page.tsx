import { generateMetadata } from '../../src/utils/generateMetadata';
import BuyMeCoffeePage from '.';

export const metadata = generateMetadata({
  title: 'Build Onchain Apps Toolkit',
  description: 'Build Onchain Applications with the best consumer experience in a few minutes.',
  images: 'themes.png',
  pathname: 'buy-me-coffee'
});

export default function Page() {
  return <BuyMeCoffeePage />;
}
