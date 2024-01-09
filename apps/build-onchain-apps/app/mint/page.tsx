import { generateMetadata } from '../../src/utils/generateMetadata';
import MintPage from '.';

export const metadata = generateMetadata({
  title: 'Build Onchain Apps - Mint',
  description: 'Build Onchain Applications with the best consumer experience in a few minutes.',
  images: 'themes.png',
  pathname: 'mint'
});

export default function Page() {
  return <MintPage />;
}
