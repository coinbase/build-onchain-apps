import clsx from 'clsx';
import NextImage from '@/components/NextImage/NextImage';

type ItemProps = {
  src: string;
  altText: string;
  active?: boolean;
  className?: string;
};

export default function Item({ src, altText, active = true, className }: ItemProps) {
  return (
    <div className="relative w-full">
      <NextImage
        src={src}
        altText={altText}
        className={clsx('block rounded-xl', active ? null : 'opacity-30', className)}
      />
    </div>
  );
}
