import Image from 'next/image';
import UserAvatar from './Avatar.svg';

export default function Profile() {
  // TODO: Fetch these values dynamically
  const coffeeReceivedCount = 90;
  const userName = '0xPudgy';
  const aboutUser = 'I am a content creator producing videos about NFTs!';

  return (
    <section className="font-inter flex flex-col justify-start gap-8 md:flex-row md:items-center">
      {/* Fetch user avatar dynamically */}
      <Image alt="User Avatar" src={UserAvatar} className="h-28 w-28" />
      <div className="flex flex-col items-start justify-start gap-2">
        <h1 className="w-96 text-3xl font-semibold text-white">{userName}</h1>
        <p className="text-base font-normal leading-normal text-zinc-400">{aboutUser}</p>
        <p className="flex items-center justify-start gap-2">
          <Image
            alt="Coffees Received"
            src="/coffee.svg"
            className="h-4 w-4"
            width={0}
            height={0}
          />
          <span className="text-base font-normal leading-normal text-white">
            {coffeeReceivedCount} cups of coffee received
          </span>
        </p>
      </div>
    </section>
  );
}
