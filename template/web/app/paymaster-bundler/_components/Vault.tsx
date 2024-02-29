import clsx from 'clsx';
import { roboto } from 'app/fonts';
import { ALL_ITEMS } from '../constants';
import { OwnedTokensType } from '../types';
import Item from './Item';

type VaultProps = {
  ownedTokens: OwnedTokensType;
};

export default function Vault({ ownedTokens }: VaultProps) {
  return (
    <div className="w-full rounded-bl-xl bg-boat-color-gray-900 px-8 py-10">
      <h2 className={clsx('mb-5 text-2xl', roboto.className)}>VAULT</h2>

      <h3 className={clsx('mb-1 text-lg', roboto.className)}>Items</h3>
      <div className="border border-x-0 border-t-0 border-boat-gold" />

      <div className="my-4 flex gap-4">
        {ALL_ITEMS.map((item) => {
          return (
            <Item
              key={item.name}
              src={item.image}
              altText={item.name}
              active={!!ownedTokens[item.name]}
              amount={ownedTokens[item.name]}
            />
          );
        })}
      </div>

      <h3 className={clsx('mb-1 text-lg', roboto.className)}>Mystery boxes</h3>
      <div className="border border-x-0 border-t-0 border-boat-gold" />

      <div className="my-4 flex gap-4">
        <Item src="/account_abstraction/mystery_box.png" altText="Mystery Box" />
        <div className="w-full" />
        <div className="w-full" />
        <div className="w-full" />
      </div>
    </div>
  );
}
