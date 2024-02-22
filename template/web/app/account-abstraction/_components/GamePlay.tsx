import NextImage from '@/components/NextImage/NextImage';

export default function GamePlay() {
  return (
    <div className="w-full px-10 py-10">
      <div>
        <NextImage
          src="/account_abstraction/mystery_box.png"
          altText="Mystery Box"
          className="block rounded-2xl"
        />
      </div>

      <div className="my-4 text-center text-violet-200">Rarity score: 501</div>

      <h1 className="text-center text-2xl">Athena Mystery Box</h1>

      <div className="mt-8">
        <div className="mx-auto max-w-[130px]">
          {/* TODO: Make this a button variant */}
          <button
            type="button"
            className="block w-full rounded-full border border-boat-color-orange py-4"
          >
            Open box
          </button>
        </div>
      </div>
    </div>
  );
}
