import type { Metadata } from 'next';

type MetaTagsProps = {
  title: string;
  description: string;
  images: string | string[];
  url?: string;
  pathname: string;
};

export const generateMetadata = ({
  title = 'Build Onchain Apps',
  description = 'The easier way to build onchain apps.',
  images,
  url = 'https://github.com/coinbase/build-onchain-apps',
  pathname,
}: MetaTagsProps): Metadata => {
  const i = Array.isArray(images) ? images : [images];
  return {
    title,
    description,
    openGraph: {
      url: `${url}${pathname ?? ''}`,
      title,
      description,
      images: i.map(img => `${url}/social/${img}`),
    }
  }
};
