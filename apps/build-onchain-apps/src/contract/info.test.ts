import { CONTRACT_BUY_ME_COFFEE, CONTRACT_CUSTOM_1155 } from './info';

describe('contract info', () => {

  describe('CONTRACT_BUY_ME_COFFEE', () => {
    it('should have a valid ABI', () => {
      expect(CONTRACT_BUY_ME_COFFEE.abi).toBeInstanceOf(Array);
    });

    it('should have a valid contract address', () => {
      expect(CONTRACT_BUY_ME_COFFEE.address).toMatch(/^0x[a-fA-F0-9]{40}$/);
    });
  });

  describe('CONTRACT_CUSTOM_1155', () => {
    it('should have a valid ABI', () => {
      expect(CONTRACT_CUSTOM_1155.abi).toBeInstanceOf(Array);
    });
  
    it('should have a valid contract address', () => {
      expect(CONTRACT_CUSTOM_1155.address).toMatch(/^0x[a-fA-F0-9]{40}$/);
    });
  });
});
