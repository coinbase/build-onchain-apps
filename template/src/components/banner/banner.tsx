import clsx from 'clsx';
import Image from 'next/image';
import NextLink from 'next/link';

type BannerProps = {
  pageName: string;
  pageUrl: string;
};

export default function Banner({ pageName, pageUrl }: BannerProps) {
  return (
    <section
      className={clsx(
        'inline-flex h-32 items-center justify-between p-6 md:flex-row',
        'rounded-lg border border-zinc-400 border-opacity-20 bg-neutral-900',
      )}
    >
      <div className="flex grow items-start justify-start gap-6">
        <div className="flex h-12 w-12 items-center justify-center">
          <Image
            src="/hammerandpick.svg"
            width={10}
            height={10}
            alt="hammerandpick"
            className="h-12 w-12"
          />
        </div>
        <div className="inline-flex grow flex-col items-start justify-start gap-2">
          <h1 className="font-inter text-base font-semibold leading-normal text-white">
            Step into the {pageName} experience.
          </h1>
          <div className="font-inter text-base font-normal leading-normal text-white">
            Take a dive into our fully functional demo page. Explore how the Smart Contract works,
            connect with it using Wagmi, and master a seamless user experience with React and
            Tailwind.
          </div>
        </div>
      </div>
      <div className="flex basis-1/3 items-center justify-end gap-2.5">
        <NextLink
          href={`/${pageUrl}#guide`}
          className={clsx(
            'font-inter w-38 rounded-3xl bg-white px-4 py-2',
            'text-center text-sm font-medium leading-normal text-black',
          )}
        >
          Read the Guide
        </NextLink>
      </div>
    </section>
  );
}
