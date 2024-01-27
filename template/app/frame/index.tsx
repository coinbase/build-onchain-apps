'use client';

import Header from '../../src/components/header/Header';

/**
 * Server component, which imports the FramePage component (client component that has 'use client' in it)
 * https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts
 * https://nextjs.org/docs/pages/building-your-application/upgrading/app-router-migration#step-4-migrating-pages
 * https://nextjs.org/docs/app/building-your-application/rendering/client-components
 */
export default function Page() {
  return (
    <>
      <Header />
      <main className="container mx-auto flex flex-col px-8 py-28">
        <h2>Frame Test</h2>
      </main>
    </>
  );
}
