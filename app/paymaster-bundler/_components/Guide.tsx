/* eslint-disable react/no-unescaped-entities */
import { useMemo } from 'react';
import CodeBlock from '@/components/code-block/CodeBlock';
import {
  useGuideScroll,
  P,
  H3,
  H4,
  Section,
  Hr,
  A,
  Ul,
  Li,
  TableOfContents,
} from '@/components/layout/guide';

const validateUserOperation = `\`\`\`javascript
import { ENTRYPOINT_ADDRESS_V06, UserOperation } from "permissionless";
import {
  Address,
  BlockTag,
  Hex,
  decodeAbiParameters,
  decodeFunctionData,
} from "viem";
import { baseSepolia } from "viem/chains";
import {client} from "./config"
import {
  coinbaseSmartWalletABI,
  coinbaseSmartWalletProxyBytecode,
  coinbaseSmartWalletV1Implementation,
  erc1967ProxyImplementationSlot,
  magicSpendAddress
} from "./constants"
import { myNFTABI, myNFTAddress } from "./myNFT";
 
export async function willSponsor({
  chainId,
  entrypoint,
  userOp,
}: { chainId: number; entrypoint: string; userOp: UserOperation<"v0.6"> }) {
  // check chain id
  if (chainId !== baseSepolia.id) return false;
  // check entrypoint
  // not strictly needed given below check on implementation address, but leaving as example
  if (entrypoint.toLowerCase() !== ENTRYPOINT_ADDRESS_V06.toLowerCase())
    return false;
 
  try {
    // check the userOp.sender is a proxy with the expected bytecode
    const code = await client.getBytecode({ address: userOp.sender });
    if (code != coinbaseSmartWalletProxyBytecode) return false;
 
    // check that userOp.sender proxies to expected implementation
    const implementation = await client.request<{
      Parameters: [Address, Hex, BlockTag];
      ReturnType: Hex;
    }>({
      method: "eth_getStorageAt",
      params: [userOp.sender, erc1967ProxyImplementationSlot, "latest"],
    });
    const implementationAddress = decodeAbiParameters(
      [{ type: "address" }],
      implementation,
    )[0];
    if (implementationAddress != coinbaseSmartWalletV1Implementation)
      return false;
 
    // check that userOp.callData is making a call we want to sponsor
    const calldata = decodeFunctionData({
      abi: coinbaseSmartWalletABI,
      data: userOp.callData,
    });
 
    // keys.coinbase.com always uses executeBatch
    if (calldata.functionName !== "executeBatch") return false;
    if (!calldata.args || calldata.args.length == 0) return false;
 
    const calls = calldata.args[0] as {
      target: Address;
      value: bigint;
      data: Hex;
    }[];
    // modify if want to allow batch calls to your contract
    if (calls.length > 2) return false;
 
    let callToCheckIndex = 0;
    if (calls.length > 1) {
      // if there is more than one call, check if the first is a magic spend call
      if (calls[0].target.toLowerCase() !== magicSpendAddress.toLowerCase())
        return false;
      callToCheckIndex = 1;
    }
 
    if (
      calls[callToCheckIndex].target.toLowerCase() !==
      myNFTAddress.toLowerCase()
    )
      return false;
 
    const innerCalldata = decodeFunctionData({
      abi: myNFTABI,
      data: calls[callToCheckIndex].data,
    });
    if (innerCalldata.functionName !== "safeMint") return false;
 
    return true;
  } catch (e) {
    console.error(\`willSponsor check failed: \${e}\`);
    return false;
  }
}
\`\`\``;

const createProxy = `\`\`\`javascript
import { paymasterClient } from "./config";
import { willSponsor } from "./utils";
 
export async function POST(r: Request) {
  const req = await r.json();
  const method = req.method;
  const [userOp, entrypoint, chainId] = req.params;
  console.log(req.params);
  if (!willSponsor({ chainId: parseInt(chainId), entrypoint, userOp })) {
    return Response.json({ error: "Not a sponsorable operation" });
  }
 
  if (method === "pm_getPaymasterStubData") {
    const result = await paymasterClient.getPaymasterStubData({
      userOperation: userOp,
    });
    return Response.json({ result });
  } else if (method === "pm_getPaymasterData") {
    const result = await paymasterClient.getPaymasterData({
      userOperation: userOp,
    });
    return Response.json({ result });
  }
  return Response.json({ error: "Method not found" });
}
\`\`\``;

const sendEIP5792Requests = `\`\`\`javascript
import { useAccount } from "wagmi";
import { useCapabilities, useWriteContracts } from "wagmi/experimental";
import { useMemo, useState } from "react";
import { CallStatus } from "./CallStatus";
import { myNFTABI, myNFTAddress } from "./myNFT";
 
export function App() {
  const account = useAccount();
  const [id, setId] = useState<string | undefined>(undefined);
  const { writeContracts } = useWriteContracts({
    mutation: { onSuccess: (id) => setId(id) },
  });
  const { data: availableCapabilities } = useCapabilities({
    account: account.address,
  });
  const capabilities = useMemo(() => {
    if (!availableCapabilities || !account.chainId) return {};
    const capabilitiesForChain = availableCapabilities[account.chainId];
    if (
      capabilitiesForChain["paymasterService"] &&
      capabilitiesForChain["paymasterService"].supported
    ) {
      return {
        paymasterService: {
          url: \`\${document.location.origin}/api/paymaster\`,
        },
      };
    }
    return {};
  }, [availableCapabilities]);
 
  return (
    <div>
      <h2>Transact With Paymaster</h2>
      <p>{JSON.stringify
        <p>{JSON.stringify(capabilities)}</p>
(capabilities)}</p>
      <div>
        <button
          onClick={() => {
            writeContracts({
              contracts: [
                {
                  address: myNFTAddress,
                  abi: myNFTABI,
                  functionName: "safeMint",
                  args: [account.address],
                },
              ],
              capabilities,
            });
          }}
        >
          Mint
        </button>
        {id && <CallStatus id={id} />}
      </div>
    </div>
  );
}
\`\`\``;

export default function NewGuide() {
  useGuideScroll();

  const contents = useMemo(
    () => [
      {
        href: '#introduction',
        label: 'Paymasters (Sponsored Transactions)',
      },
      {
        href: '#choosing-paymaster',
        label: 'Choose a paymaster service provider',
      },
      {
        href: '#setting-proxy',
        label: '(Recommended) Setup your paymaster proxy',
      },
      {
        href: '#send-eip-5792-requests',
        label: 'Send EIP-5792 Requests',
      },
    ],
    [],
  );

  return (
    <div>
      <H3 id="guide">Guide to Using Smart Wallets with Sponsored Transactions</H3>
      <div className="gap-16 lg:flex">
        <main className="w-full flex-shrink-0 flex-grow xl:max-w-[900px]">
          <Hr />
          <Section id="introduction">
            <H4>Paymasters (Sponsored Transactions)</H4>
            <P>
              One of the biggest UX enhancements unlocked by Smart Wallet is the ability for app
              developers to sponsor their users' transactions. If your app supports Smart Wallet,
              you can start sponsoring your users' transactions by using{' '}
              <A href="https://www.erc7677.xyz/introduction">
                standardized paymaster service communication
              </A>
              <A href="https://www.eip5792.xyz/introduction">enabled by new wallet RPC methods</A>.
              This code is also in our{' '}
              <A href="https://github.com/wilsoncusack/wagmi-scw/">Wagmi Smart Wallet template</A>.
            </P>
          </Section>
          <Section id="choosing-paymaster">
            <H4>1. Choose a Paymaster Service Provider</H4>
            <P>
              As a prerequisite, you'll need to obtain a paymaster service URL from a paymaster
              service provider. To be compatible with Smart Wallet, the paymaster provider you
              choose must be ERC-7677-compliant.
            </P>
            <P>
              We recommend the <A href="https://login.coinbase.com">Coinbase Developer Platform</A>{' '}
              paymaster. You can find a full list of ERC-7677-compliant paymaster services{' '}
              <A href="https://www.erc7677.xyz/ecosystem/paymasters">here</A>.
            </P>
            <P>
              Once you choose a paymaster service provider and obtain a paymaster service URL, you
              can proceed to integration.
            </P>
          </Section>
          <Section id="setting-proxy">
            <H4>2. (Recommended) Set Up Your Paymaster Proxy</H4>
            <P>
              Creating an API to proxy calls to your paymaster service is important for two reasons:
            </P>
            <Ul>
              <Li>It allows you to protect any API secret.</Li>
              <Li>It allows you to add extra validation on what requests you want to sponsor.</Li>
            </Ul>
            <H4>Validate UserOperation</H4>
            <P>
              Before we write our proxy, let's write a willSponsor function to add some extra
              validation. The policies on many paymaster services are quite simple and limited. As
              your API will be exposed on the web, you want to make sure it cannot be abused: called
              to sponsor transactions you do not want to fund. The checks below are a bit tedious,
              but highly recommended to be safe. See "Trust and Validation"{' '}
              <A href="https://hackmd.io/@AhweV9sISeevhvrtVPCGDw/BynRsX7Ca#Trust-and-Validation">
                here
              </A>{' '}
              for more on this. The code below is built specifically for Smart Wallets; it would
              need to be updated to support other smart accounts.
            </P>
            <CodeBlock code={validateUserOperation} language="javascript" />
          </Section>
          <Section id="setting-proxy">
            <H4>Create Proxy</H4>
            <P>
              The proxy you create will need to handle the pm_getPaymasterStubData and
              pm_getPaymasterData JSON-RPC requests specified by ERC-7677.
            </P>
            <CodeBlock code={createProxy} language="javascript" />
          </Section>
          <Section id="send-eip-5792-requests">
            <H4>3. Send EIP-5792 Requests with a Paymaster Service Capability</H4>
            <P>
              Once you have your paymaster service set up, you can now pass its URL along to Wagmi's
              useWriteContracts hook. If you set up a proxy in your app's backend as recommended in
              step (2) above, you'll want to pass in the proxy URL you created.
            </P>
            <CodeBlock code={sendEIP5792Requests} language="javascript" />
            <P>
              That's it! Smart Wallet will handle the rest. If your paymaster service is able to
              sponsor the transaction, Smart Wallet will indicate to your user that the transaction
              is sponsored.
            </P>
          </Section>
        </main>
        <TableOfContents title="Guide to Sponsored Transactions" contents={contents} />
      </div>
      <P>
        <strong>See full documentation here:</strong>{' '}
        <A href="https://www.smartwallet.dev/">Smart Wallet Documentation</A>{' '}
      </P>
    </div>
  );
}
