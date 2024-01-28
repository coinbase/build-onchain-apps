import { getFrameMetadata } from '@coinbase/onchainkit';
import { generateMetadata } from '../../src/utils/generateMetadata';
import FramePage from '.';

export const metadata = generateMetadata({
  title: 'Build Onchain Apps - Frame',
  description: 'Build Onchain Applications with the best consumer experience in a few minutes.',
  images: 'themes.png',
  pathname: 'frame',
  frame: getFrameMetadata({
    buttons: ['boat'],
    image: 'https://build-onchain-apps.vercel.app/release/v-0-16.png',
    post_url: 'https://build-onchain-apps.vercel.app/api/frame',
  }),
});

/**
 * Use the page component to wrap the components
 * that you want to render on the page.
 */
export default function Page() {
  return <FramePage />;
}
