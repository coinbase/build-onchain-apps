import Image from 'next/image';
import UserAvatar from './Avatar.svg';

export default function Introduction() {
  // TODO: Fetch these values dynamically
  const coffeeReceivedCount = 90;
  const userName = '0xPudgy';
  const aboutUser = 'I am a content creator producing videos about NFTs!';

  return (
    <section>
      <div className="mx-[-100vw] my-10 h-px bg-zinc-400 bg-opacity-20 md:my-16" />
      <div className="flex flex-col justify-start gap-8 md:flex-row md:items-center">
        {/* Fetch user avatar dynamically */}
        <Image alt="User Avatar" src={UserAvatar} className="h-28 w-28" />
        <div className="flex flex-col items-start justify-start gap-2">
          <div className="w-96 text-3xl font-semibold text-white">{userName}</div>
          <div className="text-base font-normal leading-normal text-zinc-400">{aboutUser}</div>
          <div className="flex items-center justify-start gap-2">
            <Image alt="Coffees Received" src="/coffee.svg" className="h-4 w-4" width={0} height={0} />
            <div className="text-base font-normal leading-normal text-white">
              {coffeeReceivedCount} cups of coffee received
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
