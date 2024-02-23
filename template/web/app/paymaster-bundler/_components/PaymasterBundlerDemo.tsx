import GamePlay from './GamePlay';
import Header from './Header';
import Vault from './Vault';

export default function PaymasterBundlerDemo() {
  return (
    <div className="mb-10 rounded-lg border border-boat-color-palette-line">
      <Header />
      <div className="lg:flex">
        <Vault />
        <GamePlay />
      </div>
    </div>
  );
}
