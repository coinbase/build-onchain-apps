import clsx from 'clsx';
import Image from 'next/image';

type DisclaimerProps = {
  pageName: string;
};

export default function Disclaimer({ pageName }: DisclaimerProps) {
  return (
    <div
      className={clsx(
        'flex w-full flex-col items-center justify-between rounded-xl md:flex-row ',
        'mt-28 bg-boat-footer-dark-gray p-4 text-base text-white md:mt-10 lg:mt-24',
      )}
    >
      <div className="flex flex-col gap-3 px-10 md:flex-row">
        <Image
          src="/hammerandpick.svg"
          width={10}
          height={10}
          alt="hammerandpick"
          className="h-10 w-10"
        />
        <div className="flex flex-col">
          <div className="font-semibold">Hey! This is a demo environment</div>
          <div className="max-w-prose text-sm font-light">
            This is our {pageName} demo page. It’s fully functional so you can try it on your own.
            Build your own page by checking out our open source repo.
          </div>
        </div>
      </div>
      <a href="https://github.com/coinbase/build-onchain-apps" target="_blank" className="mt-2">
        <button
          type="submit"
          className="flex cursor-pointer items-center rounded-3xl  bg-white px-4 py-2  text-sm text-black"
        >
          View repo
        </button>
      </a>
    </div>
  );
}
