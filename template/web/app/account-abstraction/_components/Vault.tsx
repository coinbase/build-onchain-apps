import NextImage from '@/components/NextImage/NextImage';

export default function Vault() {
  return (
    <div className="w-full rounded-bl-xl bg-boat-color-gray-900 px-8 py-10">
      <h2 className="mb-5 text-2xl">Vault</h2>

      <h3 className="mb-1">Weapons</h3>
      <div className="border-boat-gold border border-x-0 border-t-0" />

      <div className="my-4 flex gap-4">
        <div className="w-full">
          <NextImage
            src="/account_abstraction/sword.png"
            altText="Sword"
            className="block rounded-xl opacity-30"
          />
        </div>
        <div className="w-full">
          <NextImage
            src="/account_abstraction/shield.png"
            altText="Shield"
            className="block rounded-xl opacity-30"
          />
        </div>
        <div className="w-full">
          <NextImage
            src="/account_abstraction/bow_arrow.png"
            altText="Bow and Arrow"
            className="block rounded-xl opacity-30"
          />
        </div>
        <div className="w-full">
          <NextImage
            src="/account_abstraction/wing_suit.png"
            altText="Wing Suit"
            className="block rounded-xl opacity-30"
          />
        </div>
      </div>

      <h3 className="mb-1">Mystery boxes</h3>
      <div className="border-boat-gold border border-x-0 border-t-0" />

      <div className="my-4 flex gap-4">
        <div className="w-full">
          <NextImage
            src="/account_abstraction/mystery_box.png"
            altText="Mystery Box"
            className="block rounded-xl"
          />
        </div>
        <div className="w-full" />
        <div className="w-full" />
        <div className="w-full" />
      </div>
    </div>
  );
}
