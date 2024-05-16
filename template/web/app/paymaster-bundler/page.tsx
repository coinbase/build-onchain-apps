'use client';
import clsx from 'clsx';
import Header from '@/components/layout/header/Header';
import Main from '@/components/layout/Main';

/**
 * Use the page component to wrap the components
 * that you want to render on the page.
 */
export default function PaymasterBundlerPage() {
  return (
    <>
      <Header />
      <Main>
        <h1 className={clsx('text-4xl', 'font-bold', 'text-center', 'mt-8')}>
          🚧 Paymaster Bundler App - Coming Soon! 🚧
        </h1>
      </Main>
    </>
  );
}
