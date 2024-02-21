import GamePlay from './GamePlay';
import Header from './Header';
import Vault from './Vault';

export default function AccountAbstractionDemo() {
  return (
    <div className="rounded-xl border border-boat-color-palette-line">
      <Header />
      <div className="flex">
        <Vault />
        <GamePlay />
      </div>
    </div>
  );
}
