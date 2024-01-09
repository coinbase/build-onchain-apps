import { generateMetadata } from '../src/utils/generateMetadata';
import Home from './home';

export const metadata = generateMetadata({
  title: 'Build Onchain Apps Toolkit',
  description: 'Build Onchain Applications with the best consumer experience in a few minutes.',
  images: 'themes.png',
  pathname: ''
});

export default function Page() {
  return <Home />;
}
