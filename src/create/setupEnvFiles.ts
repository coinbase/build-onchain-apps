import * as fs from 'fs';
import * as path from 'path';
import { EnvVar } from './getUserInput';

export function setupEnvFiles(projectDir: string, envVar: EnvVar) {
  if (envVar === undefined) return;

  const envLocalPath = path.join(projectDir, './web/.env.local');
  const content = `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=${envVar.walletConnectProjectID ?? '"GET_ID_FROM_WALLET_CONNET" # See https://cloud.walletconnect.com'}
NEXT_PRIVATE_RPC_URL=${envVar.rpcUrl ?? '"GET_FROM_COINBASE_DEVELOPER_PLATFORM" # See https://portal.cdp.coinbase.com/products/base'}
NEXT_PRIVATE_PAYMASTER_URL=${envVar.rpcUrl ?? '"GET_FROM_COINBASE_DEVELOPER_PLATFORM" # See https://portal.cdp.coinbase.com/products/base'}
NEXT_PUBLIC_PRIVY_ID="GET_FROM_PRIVY"
ENVIRONMENT=localhost
`;
  fs.writeFileSync(envLocalPath, content);

  const envPath = path.join(projectDir, './contracts/.env');
  const content2 = `PRIVATE_KEY=
BLOCK_EXPLORER_API_KEY=${envVar.blockExplorerApiKey ?? ''}
`;
  fs.writeFileSync(envPath, content2);
}
