import { generateMetadata } from '../src/utils/generateMetadata';
import Home from './home';

export const metadata = generateMetadata({
  title: 'Build Onchain Apps Toolkit',
  description: 'Build Onchain Applications with the best consumer experience in a few minutes.',
  images: 'themes.png',
  pathname: '',
});

/**
 * Server component, which imports the Home component (client component that has 'use client' in it)
 * https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts
 * https://nextjs.org/docs/pages/building-your-application/upgrading/app-router-migration#step-4-migrating-pages
 * https://nextjs.org/docs/app/building-your-application/rendering/client-components
 */
export default function Page() {
  return <Home />;
}
