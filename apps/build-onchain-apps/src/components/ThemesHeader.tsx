import { Header, HeaderProps } from './Header';

export function ThemesHeader(props: HeaderProps) {
  return (
    <Header
      gitHubLink="https://github.com/coinbase/build-onchain-apps/tree/main/apps/build-onchain-apps"
      {...props}
    />
  );
}
