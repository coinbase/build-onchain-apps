import clsx from 'clsx';
import NextImage from '@/components/NextImage/NextImage';

type ItemProps = {
  src: string;
  altText: string;
  active?: boolean;
  amount?: number;
  className?: string;
};

export default function Item({ src, altText, active = true, amount, className }: ItemProps) {
  return (
    <div className="relative w-full">
      <NextImage
        src={src}
        altText={altText}
        className={clsx('block rounded-xl', active ? null : 'opacity-30', className)}
      />

      {amount ? (
        <div className="absolute bottom-[5px] right-[5px] flex h-[20px] w-[20px] items-center justify-center rounded-full border border-boat-gold bg-black text-xs">
          {amount}
        </div>
      ) : null}
    </div>
  );
}
