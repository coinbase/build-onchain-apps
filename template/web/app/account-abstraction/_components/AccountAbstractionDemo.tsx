import GamePlay from './GamePlay';
import Header from './Header';
import Vault from './Vault';

export default function AccountAbstractionDemo() {
  return (
    <div className="mb-10 rounded-xl border border-boat-color-palette-line">
      <Header />
      <div className="lg:flex">
        <Vault />
        <GamePlay />
      </div>
    </div>
  );
}
