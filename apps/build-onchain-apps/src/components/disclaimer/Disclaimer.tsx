import Image from 'next/image';

export default function Disclaimer() {
  return (
    <div className="flex flex-col md:flex-row w-full items-center justify-between rounded-xl bg-[#141519] p-4 text-base text-white mt-28 md:mt-12 lg:mt-24">
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
            This is our “Buy me a coffee” demo page. It’s fully functional so you can try it on your
            own. Build your own page by checking out our open source repo.
          </div>
        </div>
      </div>
      <a href="https://github.com/coinbase/build-onchain-apps" target="_blank" className='mt-2'>
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
