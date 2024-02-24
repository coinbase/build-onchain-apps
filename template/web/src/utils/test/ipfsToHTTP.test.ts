import { ipfsToHTTP } from '../ipfs';

describe('ipfsToHTTP', () => {
  it('converts ipfs URI to HTTPS URI', () => {
    const ipfsURI = 'ipfs://QmY5V6JZ5Yf7Z6p8n7Y1Z5dJLXhZU7Z7Q3mH2nX8vqfHc5';
    const expected = 'https://ipfs.io/ipfs/QmY5V6JZ5Yf7Z6p8n7Y1Z5dJLXhZU7Z7Q3mH2nX8vqfHc5';
    expect(ipfsToHTTP(ipfsURI)).toEqual(expected);
  });

  it('converts ipfs URI with a folder path to HTTPS URI', () => {
    const ipfsURI = 'ipfs://QmT7iXqGBP3RiWrAcM6PQwtyqeXPsHpUDLatpNo8gNFDfK/metadata/1.json';
    const expected =
      'https://ipfs.io/ipfs/QmT7iXqGBP3RiWrAcM6PQwtyqeXPsHpUDLatpNo8gNFDfK/metadata/1.json';
    expect(ipfsToHTTP(ipfsURI)).toEqual(expected);
  });

  it('converts ipfs http URL to https url', () => {
    const ipfsURI = 'http://ipfs.io/ipfs/QmY5V6JZ5Yf7Z6p8n7Y1Z5dJLXhZU7Z7Q3mH2nX8vqfHc5';
    const expected = 'https://ipfs.io/ipfs/QmY5V6JZ5Yf7Z6p8n7Y1Z5dJLXhZU7Z7Q3mH2nX8vqfHc5';
    expect(ipfsToHTTP(ipfsURI)).toEqual(expected);
  });

  it('converts ipfs URL to HTTPS URL with provided gateway', () => {
    const ipfsURI = 'http://ipfs.io/ipfs/QmY5V6JZ5Yf7Z6p8n7Y1Z5dJLXhZU7Z7Q3mH2nX8vqfHc5';
    const expected =
      'https://cloudflare-ipfs.com/ipfs/QmY5V6JZ5Yf7Z6p8n7Y1Z5dJLXhZU7Z7Q3mH2nX8vqfHc5';
    expect(ipfsToHTTP(ipfsURI, 'cloudflare-ipfs.com')).toEqual(expected);
  });
});
