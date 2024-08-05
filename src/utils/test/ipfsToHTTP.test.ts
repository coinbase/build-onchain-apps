import { ipfsToHTTP } from '../ipfs';

describe('ipfsToHTTP', () => {
  it('converts ipfs URI to HTTPS URI', () => {
    const ipfsURI = 'ipfs://QmY5V6JZ5Yf7Z6p8n7Y1Z5dJLXhZU7Z7Q3mH2nX8vqfHc5';
    const expected = 'https://ipfs.io/ipfs/QmY5V6JZ5Yf7Z6p8n7Y1Z5dJLXhZU7Z7Q3mH2nX8vqfHc5';
    expect(ipfsToHTTP(ipfsURI)).toEqual(expected);
  });
});
