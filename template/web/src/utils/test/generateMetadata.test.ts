import { generateMetadata } from '../generateMetadata';

describe('generateMetadata', () => {
  it('should set metadataBase default', () => {
    const metadata = generateMetadata({
      title: 'Build Onchain Apps Template',
      description: 'Build Onchain Applications with the best consumer experience in a few minutes.',
      images: 'themes.png',
      pathname: '',
    });
    expect(metadata.metadataBase).toEqual(new URL('http://localhost:3000'));
  });

  const envs = [
    ['BOAT_DEPLOY_URL', 'boat-deploy-url.com', 'https://boat-deploy-url.com'],
    ['VERCEL_URL', 'vercel-url.com', 'https://vercel-url.com'],
  ];
  describe.each(envs)(
    'generateMetadata with different environment variables',
    (envVar, envValue, expectedUrl) => {
      it(`should set metadataBase from ${envVar}`, async () => {
        envs.forEach(([v]) => delete process.env[v]);
        process.env[envVar] = envValue;
        jest.resetModules();

        const { generateMetadata: generateMetadata2 } = await import('../generateMetadata');
        const metadata = generateMetadata2({
          title: 'Build Onchain Apps Template',
          description:
            'Build Onchain Applications with the best consumer experience in a few minutes.',
          images: 'themes.png',
          pathname: '',
        });

        expect(metadata.metadataBase).toEqual(new URL(expectedUrl));
      });
    },
  );
});
