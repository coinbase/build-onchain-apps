import Image from 'next/image';

type NextImageProps = {
  src: string;
  altText: string;
  className?: string;
};

export default function NextImage({ src, altText, className }: NextImageProps) {
  return (
    <Image
      src={src}
      // Hack for Next Image to not have to use fixed width and height
      width={0}
      height={0}
      sizes="100vw"
      style={{ width: '100%' }}
      alt={altText}
      className={className}
    />
  );
}
