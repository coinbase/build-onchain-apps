
import { parseAbiItem, encodeFunctionData } from "viem"
import NextImage from '@/components/NextImage/NextImage';
import { nftAbi } from "./abi";

type GameplayProps = {
  smartAccount: any;
}

export default function GamePlay(props: GameplayProps) {
  const smartAccount = props.smartAccount;


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
            className="block w-full rounded-full border border-boat-color-orange py-4" //TODO: add disabled
            onClick={async () => {
              const data = encodeFunctionData({
                abi: nftAbi,
                functionName: "mintTo",
                args: [smartAccount.account.address, 0],
              })
              const res = await smartAccount.sendTransaction({
                to: "0x06a7b468423065C925882227168504793Fe65e36",
                data: data,
                value: BigInt(0)
              })
              console.log("res", res)
            }}
          >
            Open box
          </button>
        </div>
      </div>
    </div>
  );
}
