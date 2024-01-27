'use client';
import Header from '../../src/components/header/Header';

/**
 * Use the page component to wrap the components
 * that you want to render on the page.
 */
export default function FramePage() {
  return (
    <>
      <Header />
      <main className="container mx-auto flex flex-col px-8 py-28">
        <h2>Frame Test</h2>
      </main>
    </>
  );
}
