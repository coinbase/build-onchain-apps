import NextImage from '@/components/NextImage/NextImage';

const LIGHTNINGS = [1, 2, 3];

export default function Header() {
  return (
    <div className="flex justify-between rounded-t-xl border border-x-0 border-t-0 border-boat-color-palette-line bg-boat-footer-dark-gray p-6">
      <div className="flex items-center gap-3">
        <div>
          <NextImage
            src="/account_abstraction/knight.png"
            altText="Knight Logo"
            className="block h-[30px] w-[25px]"
          />
        </div>
        <h1 className="text-2xl text-boat-color-orange">KNIGHT WARRIORS</h1>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex">
          {LIGHTNINGS.map((l) => {
            return (
              <NextImage
                key={`lightning-${l}`}
                src="/account_abstraction/lightning.png"
                altText="Lightning Bolt"
                className="block h-[24px] w-[24px]"
              />
            );
          })}
        </div>

        <div>
          <NextImage
            src="/account_abstraction/avatar.png"
            altText="Avatar"
            className="block h-[48px] w-[48px]"
          />
        </div>
      </div>
    </div>
  );
}
