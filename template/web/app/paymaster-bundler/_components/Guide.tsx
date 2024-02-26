export default function Guide() {
  return (
    <>
      <h3 className="mb-6 text-4xl font-medium text-white" id="guide">
        Guide
      </h3>
      <h2 className="mb-6 text-4xl font-medium text-white">
        Welcome to the Paymaster experience!
        <div>This guide will help you get started with Coinbase Cloud&apos;s Paymaster.</div>
      </h2>
      <ul className="list-disc">
        <h3 className="mb-3 text-2xl font-medium text-white">
          1. Sign up for Coinbase Cloud and create your Base project
        </h3>
        <div className="pl-12">
          <li>Navigate to https://cloud.coinbase.com/</li>
          <li>
            Create a <p className="inline font-bold">Base</p> project under{' '}
            <p className="inline font-bold"> Start a New Project</p>
            <ul className="list-disc pl-4">
              <li>
                Choose <p className="inline font-bold">Sepolia</p> as the network
              </li>
            </ul>
          </li>
          <li>
            Under Paymaster & Bundler, click <p className="inline font-bold">Activate</p>
            <ul className="list-disc pl-4">
              <li>This step may take up to 30 seconds to propagate changes</li>
              <li>
                <p className="italic">
                  (Optional) Set a custom gas policy for your project under Manage
                </p>
              </li>
            </ul>
          </li>
          <li>
            Copy your RPC URL, and set it as{' '}
            <p className="inline font-bold text-boat-color-orange">NEXT_PUBLIC_RPC_URL</p> and{' '}
            <p className="inline font-bold text-boat-color-orange">NEXT_PUBLIC_PAYMASTER_URL</p> in
            the .env.local file.
          </li>
        </div>
        <h3 className="mb-3 mt-3 text-2xl font-medium text-white">2. Set up authentication</h3>
        <div className="pl-12">
          <li>Visit https://www.privy.io/</li>
          <li>
            Create a project, copy your app ID, and set it as{' '}
            <p className="inline font-bold text-boat-color-orange">NEXT_PUBLIC_PRIVY_ID</p> in the
            .env.local file.
          </li>
        </div>
        <h3 className="mb-3 mt-3 text-2xl font-medium text-white">
          3. Start building your application!
        </h3>
        <div className="pl-12">
          <li>
            To sponsor other types of transactions or use a different contract, replace{' '}
            <p className="inline font-bold">abi.tsx</p> with your contract ABI, and modify{' '}
            <a
              href="https://viem.sh/docs/contract/encodeFunctionData.html"
              className="inline font-bold"
            >
              encodeFunctionData
            </a>{' '}
            with the desired transaction to sponsor. You’ll also need to replace the contract
            address in <p className="inline font-bold">sendTransaction</p>.
          </li>
        </div>
      </ul>

      <div className="h-px bg-white" />
    </>
  );
}
